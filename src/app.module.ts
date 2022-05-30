import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "./auth/auth.module";
import { HashModule } from "./hash/hash.module";
import { HttpModule } from "./http.module";
import { LogsModule } from "./logs/logs.module";
import { loaderService } from "./models/loader.service";
import { ModelsModule } from "./models/models.module";
import { UsersModule } from "./models/users/user.module";
import { UserRepository } from "./models/users/user.repository";
import { PluginModule } from "./plugins/plugin.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    PluginModule,
    ModelsModule,
    GraphQLModule.forRootAsync({
      imports: [UsersModule],
      useFactory: (userRepository: UserRepository) => ({
        playground: process.env.NODE_ENV !== "production",
        installSubscriptionHandlers: true,
        sortSchema: true,
        fieldResolverEnhancers: ["guards"],
        autoSchemaFile: "schema.gql",
        cors: {
          origin: "*",
          credentials: true,
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: true,
          optionsSuccessStatus: 204,
        },
        context: () => ({
          usersLoader: loaderService.userLoader(userRepository),
          // tagsLoader: loaderService.tagLoader(tagService),
        }),
      }),
      inject: [UserRepository],
    }),
    // TasksModule,
    HttpModule,
    LogsModule,
    AuthModule,
    HashModule,
  ],
})
export class AppModule {}

// ____Exception filter
// providers: [
//     {
//         provide: APP_FILTER,
//         useClass: AllExceptionFilter,
//     },
// ],
