const Koa = require("koa");
const InitManager = require("./core/init");
const koaBody = require("koa-body");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const catchError = require("./middlewares/exception");

const app = new Koa();
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(catchError);
app.use(require("koa-static")(__dirname));

InitManager.initCore(app);

app.listen(3000);
