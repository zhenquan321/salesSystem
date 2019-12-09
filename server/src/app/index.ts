import configs from '@configs';
import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import * as cors from '@koa/cors';
import * as path from 'path';
const koaBody = require('koa-body')
  ;
import { ServicesContext } from './context';
import { appRoutes } from './routes';
import { Server } from './server';
import { ChatService, GroupChatService, GroupService, UserService } from './services';

export const App = Server
  .init((app) => {
    app.use(compress())
      .use(koaBody({
        multipart: true, // 支持文件上传
        // encoding: 'gzip',
        // formidable: {
        //   uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        //   keepExtensions: true,    // 保持文件的后缀
        //   maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        //   onFileBegin: (name, file) => { // 文件上传前的设置
        //     // console.log(`name: ${name}`);
        //     // console.log(file);
        //   },
        // }
      }))
      .use(cors())
      .use(bodyParser())
      .use(appRoutes.routes())
      .use(appRoutes.allowedMethods())
      

  })
  .createServer()
  .createConnection()
  .then(() => {
    ServicesContext.getInstance()
      .setuserService(new UserService())
      .setGroupService(new GroupService())
      .setChatService(new ChatService())
      .setgroupChatService(new GroupChatService());

    Server.run(configs.port);
  });
