import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from '@azure/cosmos'

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
    //const name = (req.query.name || (req.body && req.body.name));
    //context.res.json({ "name": name });

    const result = await fetchAll();

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: result,
      headers: {
        'Content-Type': 'application/json',
      },
    };
};

async function fetchAll(): Promise<any[]> {
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