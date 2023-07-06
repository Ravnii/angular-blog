import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClient } from '@azure/cosmos';

interface Todo {
  id?: string;
  task: string;
  done: boolean;
}

const endpoint = process.env.DATABASE_ENDPOINT;
const key = process.env.DATABASE_KEY;

const databaseId = "todos";
const containerId = "items";

const options = {
  endpoint: endpoint,
  key: key
};

const client = new CosmosClient(options);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    let result: any;

    switch (req.method) {
      case "GET":
        result = await fetchAll();
        break;
      case "PUT":
        result = await replaceItem(req.body);
        break;
      default:
        result = await fetchAll();
        break;
    }

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: result,
      headers: {
        'Content-Type': 'application/json',
      },
    };
};

async function replaceItem(todo: Todo): Promise<Todo> {
  await client
    .database(databaseId)
    .container(containerId)
    .item(todo.id).replace(todo);

  return todo;
}

async function fetchAll(): Promise<Todo[]> {
  const querySpec = {
    query: 'SELECT c.id, c.task, c.done FROM c',
  };

  const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll();

  return results;
}

export default httpTrigger;
