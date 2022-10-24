import ContextStragety from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStragey.js"


const postgresConnectionString = "postgres://strategy:senha123@localhost:5432/heroes"

const postgresContext = new ContextStragety(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://strategy:senha123@localhost:27017/heroes"

const mongoDBContext = new ContextStragety(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();


const data =[
    {
        name: "priscillaalcantara",
        type: "transaction"
    },
    {
        name: "yuditamashiro",
        type: "activityLog"
    }
]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for (const {type, name} of data) {
    const context = contextTypes[type]

    await context.create({name: name + Date.now()})
    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read())

}