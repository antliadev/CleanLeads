
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model CadenceEngine
 * 
 */
export type CadenceEngine = $Result.DefaultSelection<Prisma.$CadenceEnginePayload>
/**
 * Model CadenceStage
 * 
 */
export type CadenceStage = $Result.DefaultSelection<Prisma.$CadenceStagePayload>
/**
 * Model LeadCadenceProgress
 * 
 */
export type LeadCadenceProgress = $Result.DefaultSelection<Prisma.$LeadCadenceProgressPayload>
/**
 * Model LeadCadenceEvent
 * 
 */
export type LeadCadenceEvent = $Result.DefaultSelection<Prisma.$LeadCadenceEventPayload>
/**
 * Model Template
 * 
 */
export type Template = $Result.DefaultSelection<Prisma.$TemplatePayload>
/**
 * Model LeadHistory
 * 
 */
export type LeadHistory = $Result.DefaultSelection<Prisma.$LeadHistoryPayload>
/**
 * Model Operator
 * 
 */
export type Operator = $Result.DefaultSelection<Prisma.$OperatorPayload>
/**
 * Model LeadNote
 * 
 */
export type LeadNote = $Result.DefaultSelection<Prisma.$LeadNotePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const LeadStatus: {
  NOVO: 'NOVO',
  AGUARDANDO_CONEXAO: 'AGUARDANDO_CONEXAO',
  AGUARDANDO_RETORNO: 'AGUARDANDO_RETORNO',
  CONTATADO: 'CONTATADO',
  EM_NEGOCIACAO: 'EM_NEGOCIACAO',
  CONVERTIDO: 'CONVERTIDO',
  PERDIDO: 'PERDIDO'
};

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus]


export const LeadSource: {
  MANUAL: 'MANUAL',
  IMPORTACAO_CSV: 'IMPORTACAO_CSV',
  IMPORTACAO_XLSX: 'IMPORTACAO_XLSX'
};

export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource]


export const TemplateChannel: {
  EMAIL: 'EMAIL',
  LINKEDIN: 'LINKEDIN',
  WHATSAPP: 'WHATSAPP'
};

export type TemplateChannel = (typeof TemplateChannel)[keyof typeof TemplateChannel]


export const CadenceStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  FINISHED: 'FINISHED',
  CANCELED: 'CANCELED',
  REPLIED: 'REPLIED'
};

export type CadenceStatus = (typeof CadenceStatus)[keyof typeof CadenceStatus]

}

export type LeadStatus = $Enums.LeadStatus

export const LeadStatus: typeof $Enums.LeadStatus

export type LeadSource = $Enums.LeadSource

export const LeadSource: typeof $Enums.LeadSource

export type TemplateChannel = $Enums.TemplateChannel

export const TemplateChannel: typeof $Enums.TemplateChannel

export type CadenceStatus = $Enums.CadenceStatus

export const CadenceStatus: typeof $Enums.CadenceStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cadenceEngine`: Exposes CRUD operations for the **CadenceEngine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CadenceEngines
    * const cadenceEngines = await prisma.cadenceEngine.findMany()
    * ```
    */
  get cadenceEngine(): Prisma.CadenceEngineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cadenceStage`: Exposes CRUD operations for the **CadenceStage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CadenceStages
    * const cadenceStages = await prisma.cadenceStage.findMany()
    * ```
    */
  get cadenceStage(): Prisma.CadenceStageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadCadenceProgress`: Exposes CRUD operations for the **LeadCadenceProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadCadenceProgresses
    * const leadCadenceProgresses = await prisma.leadCadenceProgress.findMany()
    * ```
    */
  get leadCadenceProgress(): Prisma.LeadCadenceProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadCadenceEvent`: Exposes CRUD operations for the **LeadCadenceEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadCadenceEvents
    * const leadCadenceEvents = await prisma.leadCadenceEvent.findMany()
    * ```
    */
  get leadCadenceEvent(): Prisma.LeadCadenceEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadHistory`: Exposes CRUD operations for the **LeadHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadHistories
    * const leadHistories = await prisma.leadHistory.findMany()
    * ```
    */
  get leadHistory(): Prisma.LeadHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.operator`: Exposes CRUD operations for the **Operator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Operators
    * const operators = await prisma.operator.findMany()
    * ```
    */
  get operator(): Prisma.OperatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadNote`: Exposes CRUD operations for the **LeadNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadNotes
    * const leadNotes = await prisma.leadNote.findMany()
    * ```
    */
  get leadNote(): Prisma.LeadNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Lead: 'Lead',
    CadenceEngine: 'CadenceEngine',
    CadenceStage: 'CadenceStage',
    LeadCadenceProgress: 'LeadCadenceProgress',
    LeadCadenceEvent: 'LeadCadenceEvent',
    Template: 'Template',
    LeadHistory: 'LeadHistory',
    Operator: 'Operator',
    LeadNote: 'LeadNote',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "lead" | "cadenceEngine" | "cadenceStage" | "leadCadenceProgress" | "leadCadenceEvent" | "template" | "leadHistory" | "operator" | "leadNote" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      CadenceEngine: {
        payload: Prisma.$CadenceEnginePayload<ExtArgs>
        fields: Prisma.CadenceEngineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CadenceEngineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CadenceEngineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>
          }
          findFirst: {
            args: Prisma.CadenceEngineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CadenceEngineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>
          }
          findMany: {
            args: Prisma.CadenceEngineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>[]
          }
          create: {
            args: Prisma.CadenceEngineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>
          }
          createMany: {
            args: Prisma.CadenceEngineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CadenceEngineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>[]
          }
          delete: {
            args: Prisma.CadenceEngineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>
          }
          update: {
            args: Prisma.CadenceEngineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>
          }
          deleteMany: {
            args: Prisma.CadenceEngineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CadenceEngineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CadenceEngineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>[]
          }
          upsert: {
            args: Prisma.CadenceEngineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceEnginePayload>
          }
          aggregate: {
            args: Prisma.CadenceEngineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCadenceEngine>
          }
          groupBy: {
            args: Prisma.CadenceEngineGroupByArgs<ExtArgs>
            result: $Utils.Optional<CadenceEngineGroupByOutputType>[]
          }
          count: {
            args: Prisma.CadenceEngineCountArgs<ExtArgs>
            result: $Utils.Optional<CadenceEngineCountAggregateOutputType> | number
          }
        }
      }
      CadenceStage: {
        payload: Prisma.$CadenceStagePayload<ExtArgs>
        fields: Prisma.CadenceStageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CadenceStageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CadenceStageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>
          }
          findFirst: {
            args: Prisma.CadenceStageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CadenceStageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>
          }
          findMany: {
            args: Prisma.CadenceStageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>[]
          }
          create: {
            args: Prisma.CadenceStageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>
          }
          createMany: {
            args: Prisma.CadenceStageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CadenceStageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>[]
          }
          delete: {
            args: Prisma.CadenceStageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>
          }
          update: {
            args: Prisma.CadenceStageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>
          }
          deleteMany: {
            args: Prisma.CadenceStageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CadenceStageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CadenceStageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>[]
          }
          upsert: {
            args: Prisma.CadenceStageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CadenceStagePayload>
          }
          aggregate: {
            args: Prisma.CadenceStageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCadenceStage>
          }
          groupBy: {
            args: Prisma.CadenceStageGroupByArgs<ExtArgs>
            result: $Utils.Optional<CadenceStageGroupByOutputType>[]
          }
          count: {
            args: Prisma.CadenceStageCountArgs<ExtArgs>
            result: $Utils.Optional<CadenceStageCountAggregateOutputType> | number
          }
        }
      }
      LeadCadenceProgress: {
        payload: Prisma.$LeadCadenceProgressPayload<ExtArgs>
        fields: Prisma.LeadCadenceProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadCadenceProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadCadenceProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>
          }
          findFirst: {
            args: Prisma.LeadCadenceProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadCadenceProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>
          }
          findMany: {
            args: Prisma.LeadCadenceProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>[]
          }
          create: {
            args: Prisma.LeadCadenceProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>
          }
          createMany: {
            args: Prisma.LeadCadenceProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCadenceProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>[]
          }
          delete: {
            args: Prisma.LeadCadenceProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>
          }
          update: {
            args: Prisma.LeadCadenceProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>
          }
          deleteMany: {
            args: Prisma.LeadCadenceProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadCadenceProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadCadenceProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>[]
          }
          upsert: {
            args: Prisma.LeadCadenceProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceProgressPayload>
          }
          aggregate: {
            args: Prisma.LeadCadenceProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadCadenceProgress>
          }
          groupBy: {
            args: Prisma.LeadCadenceProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadCadenceProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCadenceProgressCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCadenceProgressCountAggregateOutputType> | number
          }
        }
      }
      LeadCadenceEvent: {
        payload: Prisma.$LeadCadenceEventPayload<ExtArgs>
        fields: Prisma.LeadCadenceEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadCadenceEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadCadenceEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>
          }
          findFirst: {
            args: Prisma.LeadCadenceEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadCadenceEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>
          }
          findMany: {
            args: Prisma.LeadCadenceEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>[]
          }
          create: {
            args: Prisma.LeadCadenceEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>
          }
          createMany: {
            args: Prisma.LeadCadenceEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCadenceEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>[]
          }
          delete: {
            args: Prisma.LeadCadenceEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>
          }
          update: {
            args: Prisma.LeadCadenceEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>
          }
          deleteMany: {
            args: Prisma.LeadCadenceEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadCadenceEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadCadenceEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>[]
          }
          upsert: {
            args: Prisma.LeadCadenceEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadCadenceEventPayload>
          }
          aggregate: {
            args: Prisma.LeadCadenceEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadCadenceEvent>
          }
          groupBy: {
            args: Prisma.LeadCadenceEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadCadenceEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCadenceEventCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCadenceEventCountAggregateOutputType> | number
          }
        }
      }
      Template: {
        payload: Prisma.$TemplatePayload<ExtArgs>
        fields: Prisma.TemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findFirst: {
            args: Prisma.TemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          findMany: {
            args: Prisma.TemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          create: {
            args: Prisma.TemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          createMany: {
            args: Prisma.TemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          delete: {
            args: Prisma.TemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          update: {
            args: Prisma.TemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          deleteMany: {
            args: Prisma.TemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>[]
          }
          upsert: {
            args: Prisma.TemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplatePayload>
          }
          aggregate: {
            args: Prisma.TemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplate>
          }
          groupBy: {
            args: Prisma.TemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateCountAggregateOutputType> | number
          }
        }
      }
      LeadHistory: {
        payload: Prisma.$LeadHistoryPayload<ExtArgs>
        fields: Prisma.LeadHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>
          }
          findFirst: {
            args: Prisma.LeadHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>
          }
          findMany: {
            args: Prisma.LeadHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>[]
          }
          create: {
            args: Prisma.LeadHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>
          }
          createMany: {
            args: Prisma.LeadHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>[]
          }
          delete: {
            args: Prisma.LeadHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>
          }
          update: {
            args: Prisma.LeadHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>
          }
          deleteMany: {
            args: Prisma.LeadHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>[]
          }
          upsert: {
            args: Prisma.LeadHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadHistoryPayload>
          }
          aggregate: {
            args: Prisma.LeadHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadHistory>
          }
          groupBy: {
            args: Prisma.LeadHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<LeadHistoryCountAggregateOutputType> | number
          }
        }
      }
      Operator: {
        payload: Prisma.$OperatorPayload<ExtArgs>
        fields: Prisma.OperatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OperatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OperatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          findFirst: {
            args: Prisma.OperatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OperatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          findMany: {
            args: Prisma.OperatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>[]
          }
          create: {
            args: Prisma.OperatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          createMany: {
            args: Prisma.OperatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OperatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>[]
          }
          delete: {
            args: Prisma.OperatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          update: {
            args: Prisma.OperatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          deleteMany: {
            args: Prisma.OperatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OperatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OperatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>[]
          }
          upsert: {
            args: Prisma.OperatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OperatorPayload>
          }
          aggregate: {
            args: Prisma.OperatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOperator>
          }
          groupBy: {
            args: Prisma.OperatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<OperatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.OperatorCountArgs<ExtArgs>
            result: $Utils.Optional<OperatorCountAggregateOutputType> | number
          }
        }
      }
      LeadNote: {
        payload: Prisma.$LeadNotePayload<ExtArgs>
        fields: Prisma.LeadNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>
          }
          findFirst: {
            args: Prisma.LeadNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>
          }
          findMany: {
            args: Prisma.LeadNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>[]
          }
          create: {
            args: Prisma.LeadNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>
          }
          createMany: {
            args: Prisma.LeadNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>[]
          }
          delete: {
            args: Prisma.LeadNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>
          }
          update: {
            args: Prisma.LeadNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>
          }
          deleteMany: {
            args: Prisma.LeadNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>[]
          }
          upsert: {
            args: Prisma.LeadNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadNotePayload>
          }
          aggregate: {
            args: Prisma.LeadNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadNote>
          }
          groupBy: {
            args: Prisma.LeadNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadNoteCountArgs<ExtArgs>
            result: $Utils.Optional<LeadNoteCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    lead?: LeadOmit
    cadenceEngine?: CadenceEngineOmit
    cadenceStage?: CadenceStageOmit
    leadCadenceProgress?: LeadCadenceProgressOmit
    leadCadenceEvent?: LeadCadenceEventOmit
    template?: TemplateOmit
    leadHistory?: LeadHistoryOmit
    operator?: OperatorOmit
    leadNote?: LeadNoteOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    leads: number
    templates: number
    operators: number
    cadences: number
    notifications: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | ProfileCountOutputTypeCountLeadsArgs
    templates?: boolean | ProfileCountOutputTypeCountTemplatesArgs
    operators?: boolean | ProfileCountOutputTypeCountOperatorsArgs
    cadences?: boolean | ProfileCountOutputTypeCountCadencesArgs
    notifications?: boolean | ProfileCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountOperatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperatorWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountCadencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CadenceEngineWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    histories: number
    leadNotes: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    histories?: boolean | LeadCountOutputTypeCountHistoriesArgs
    leadNotes?: boolean | LeadCountOutputTypeCountLeadNotesArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadHistoryWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountLeadNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadNoteWhereInput
  }


  /**
   * Count Type CadenceEngineCountOutputType
   */

  export type CadenceEngineCountOutputType = {
    stages: number
    progressions: number
  }

  export type CadenceEngineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stages?: boolean | CadenceEngineCountOutputTypeCountStagesArgs
    progressions?: boolean | CadenceEngineCountOutputTypeCountProgressionsArgs
  }

  // Custom InputTypes
  /**
   * CadenceEngineCountOutputType without action
   */
  export type CadenceEngineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngineCountOutputType
     */
    select?: CadenceEngineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CadenceEngineCountOutputType without action
   */
  export type CadenceEngineCountOutputTypeCountStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CadenceStageWhereInput
  }

  /**
   * CadenceEngineCountOutputType without action
   */
  export type CadenceEngineCountOutputTypeCountProgressionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadCadenceProgressWhereInput
  }


  /**
   * Count Type LeadCadenceProgressCountOutputType
   */

  export type LeadCadenceProgressCountOutputType = {
    events: number
  }

  export type LeadCadenceProgressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | LeadCadenceProgressCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * LeadCadenceProgressCountOutputType without action
   */
  export type LeadCadenceProgressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgressCountOutputType
     */
    select?: LeadCadenceProgressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCadenceProgressCountOutputType without action
   */
  export type LeadCadenceProgressCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadCadenceEventWhereInput
  }


  /**
   * Count Type TemplateCountOutputType
   */

  export type TemplateCountOutputType = {
    cadenceStages: number
  }

  export type TemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cadenceStages?: boolean | TemplateCountOutputTypeCountCadenceStagesArgs
  }

  // Custom InputTypes
  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateCountOutputType
     */
    select?: TemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeCountCadenceStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CadenceStageWhereInput
  }


  /**
   * Count Type OperatorCountOutputType
   */

  export type OperatorCountOutputType = {
    leads: number
    leadNotes: number
  }

  export type OperatorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | OperatorCountOutputTypeCountLeadsArgs
    leadNotes?: boolean | OperatorCountOutputTypeCountLeadNotesArgs
  }

  // Custom InputTypes
  /**
   * OperatorCountOutputType without action
   */
  export type OperatorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OperatorCountOutputType
     */
    select?: OperatorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OperatorCountOutputType without action
   */
  export type OperatorCountOutputTypeCountLeadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
  }

  /**
   * OperatorCountOutputType without action
   */
  export type OperatorCountOutputTypeCountLeadNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    authUid: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    authUid: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    authUid: number
    name: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    authUid?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    authUid?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    authUid?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    authUid: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authUid?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leads?: boolean | Profile$leadsArgs<ExtArgs>
    templates?: boolean | Profile$templatesArgs<ExtArgs>
    operators?: boolean | Profile$operatorsArgs<ExtArgs>
    cadences?: boolean | Profile$cadencesArgs<ExtArgs>
    notifications?: boolean | Profile$notificationsArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authUid?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authUid?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    authUid?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authUid" | "name" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leads?: boolean | Profile$leadsArgs<ExtArgs>
    templates?: boolean | Profile$templatesArgs<ExtArgs>
    operators?: boolean | Profile$operatorsArgs<ExtArgs>
    cadences?: boolean | Profile$cadencesArgs<ExtArgs>
    notifications?: boolean | Profile$notificationsArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      leads: Prisma.$LeadPayload<ExtArgs>[]
      templates: Prisma.$TemplatePayload<ExtArgs>[]
      operators: Prisma.$OperatorPayload<ExtArgs>[]
      cadences: Prisma.$CadenceEnginePayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authUid: string
      name: string
      email: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leads<T extends Profile$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    templates<T extends Profile$templatesArgs<ExtArgs> = {}>(args?: Subset<T, Profile$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    operators<T extends Profile$operatorsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$operatorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cadences<T extends Profile$cadencesArgs<ExtArgs> = {}>(args?: Subset<T, Profile$cadencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Profile$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly authUid: FieldRef<"Profile", 'String'>
    readonly name: FieldRef<"Profile", 'String'>
    readonly email: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.leads
   */
  export type Profile$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Profile.templates
   */
  export type Profile$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    cursor?: TemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Profile.operators
   */
  export type Profile$operatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    where?: OperatorWhereInput
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    cursor?: OperatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Profile.cadences
   */
  export type Profile$cadencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    where?: CadenceEngineWhereInput
    orderBy?: CadenceEngineOrderByWithRelationInput | CadenceEngineOrderByWithRelationInput[]
    cursor?: CadenceEngineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CadenceEngineScalarFieldEnum | CadenceEngineScalarFieldEnum[]
  }

  /**
   * Profile.notifications
   */
  export type Profile$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    code: string | null
    fullName: string | null
    company: string | null
    jobTitle: string | null
    email: string | null
    phone: string | null
    linkedinUrl: string | null
    whatsappUrl: string | null
    status: $Enums.LeadStatus | null
    source: $Enums.LeadSource | null
    notes: string | null
    importBatchId: string | null
    customSource: string | null
    lastOperatorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    code: string | null
    fullName: string | null
    company: string | null
    jobTitle: string | null
    email: string | null
    phone: string | null
    linkedinUrl: string | null
    whatsappUrl: string | null
    status: $Enums.LeadStatus | null
    source: $Enums.LeadSource | null
    notes: string | null
    importBatchId: string | null
    customSource: string | null
    lastOperatorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    profileId: number
    code: number
    fullName: number
    company: number
    jobTitle: number
    email: number
    phone: number
    linkedinUrl: number
    whatsappUrl: number
    status: number
    source: number
    notes: number
    importBatchId: number
    customSource: number
    lastOperatorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadMinAggregateInputType = {
    id?: true
    profileId?: true
    code?: true
    fullName?: true
    company?: true
    jobTitle?: true
    email?: true
    phone?: true
    linkedinUrl?: true
    whatsappUrl?: true
    status?: true
    source?: true
    notes?: true
    importBatchId?: true
    customSource?: true
    lastOperatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    profileId?: true
    code?: true
    fullName?: true
    company?: true
    jobTitle?: true
    email?: true
    phone?: true
    linkedinUrl?: true
    whatsappUrl?: true
    status?: true
    source?: true
    notes?: true
    importBatchId?: true
    customSource?: true
    lastOperatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    profileId?: true
    code?: true
    fullName?: true
    company?: true
    jobTitle?: true
    email?: true
    phone?: true
    linkedinUrl?: true
    whatsappUrl?: true
    status?: true
    source?: true
    notes?: true
    importBatchId?: true
    customSource?: true
    lastOperatorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    profileId: string
    code: string
    fullName: string
    company: string | null
    jobTitle: string | null
    email: string | null
    phone: string | null
    linkedinUrl: string | null
    whatsappUrl: string | null
    status: $Enums.LeadStatus
    source: $Enums.LeadSource
    notes: string | null
    importBatchId: string | null
    customSource: string | null
    lastOperatorId: string | null
    createdAt: Date
    updatedAt: Date
    _count: LeadCountAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    code?: boolean
    fullName?: boolean
    company?: boolean
    jobTitle?: boolean
    email?: boolean
    phone?: boolean
    linkedinUrl?: boolean
    whatsappUrl?: boolean
    status?: boolean
    source?: boolean
    notes?: boolean
    importBatchId?: boolean
    customSource?: boolean
    lastOperatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    lastOperator?: boolean | Lead$lastOperatorArgs<ExtArgs>
    histories?: boolean | Lead$historiesArgs<ExtArgs>
    leadNotes?: boolean | Lead$leadNotesArgs<ExtArgs>
    cadenceEngine?: boolean | Lead$cadenceEngineArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    code?: boolean
    fullName?: boolean
    company?: boolean
    jobTitle?: boolean
    email?: boolean
    phone?: boolean
    linkedinUrl?: boolean
    whatsappUrl?: boolean
    status?: boolean
    source?: boolean
    notes?: boolean
    importBatchId?: boolean
    customSource?: boolean
    lastOperatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    lastOperator?: boolean | Lead$lastOperatorArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    code?: boolean
    fullName?: boolean
    company?: boolean
    jobTitle?: boolean
    email?: boolean
    phone?: boolean
    linkedinUrl?: boolean
    whatsappUrl?: boolean
    status?: boolean
    source?: boolean
    notes?: boolean
    importBatchId?: boolean
    customSource?: boolean
    lastOperatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    lastOperator?: boolean | Lead$lastOperatorArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    profileId?: boolean
    code?: boolean
    fullName?: boolean
    company?: boolean
    jobTitle?: boolean
    email?: boolean
    phone?: boolean
    linkedinUrl?: boolean
    whatsappUrl?: boolean
    status?: boolean
    source?: boolean
    notes?: boolean
    importBatchId?: boolean
    customSource?: boolean
    lastOperatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "code" | "fullName" | "company" | "jobTitle" | "email" | "phone" | "linkedinUrl" | "whatsappUrl" | "status" | "source" | "notes" | "importBatchId" | "customSource" | "lastOperatorId" | "createdAt" | "updatedAt", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    lastOperator?: boolean | Lead$lastOperatorArgs<ExtArgs>
    histories?: boolean | Lead$historiesArgs<ExtArgs>
    leadNotes?: boolean | Lead$leadNotesArgs<ExtArgs>
    cadenceEngine?: boolean | Lead$cadenceEngineArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    lastOperator?: boolean | Lead$lastOperatorArgs<ExtArgs>
  }
  export type LeadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    lastOperator?: boolean | Lead$lastOperatorArgs<ExtArgs>
  }

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      lastOperator: Prisma.$OperatorPayload<ExtArgs> | null
      histories: Prisma.$LeadHistoryPayload<ExtArgs>[]
      leadNotes: Prisma.$LeadNotePayload<ExtArgs>[]
      cadenceEngine: Prisma.$LeadCadenceProgressPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      code: string
      fullName: string
      company: string | null
      jobTitle: string | null
      email: string | null
      phone: string | null
      linkedinUrl: string | null
      whatsappUrl: string | null
      status: $Enums.LeadStatus
      source: $Enums.LeadSource
      notes: string | null
      importBatchId: string | null
      customSource: string | null
      lastOperatorId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lastOperator<T extends Lead$lastOperatorArgs<ExtArgs> = {}>(args?: Subset<T, Lead$lastOperatorArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    histories<T extends Lead$historiesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$historiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leadNotes<T extends Lead$leadNotesArgs<ExtArgs> = {}>(args?: Subset<T, Lead$leadNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cadenceEngine<T extends Lead$cadenceEngineArgs<ExtArgs> = {}>(args?: Subset<T, Lead$cadenceEngineArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly profileId: FieldRef<"Lead", 'String'>
    readonly code: FieldRef<"Lead", 'String'>
    readonly fullName: FieldRef<"Lead", 'String'>
    readonly company: FieldRef<"Lead", 'String'>
    readonly jobTitle: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly phone: FieldRef<"Lead", 'String'>
    readonly linkedinUrl: FieldRef<"Lead", 'String'>
    readonly whatsappUrl: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'LeadStatus'>
    readonly source: FieldRef<"Lead", 'LeadSource'>
    readonly notes: FieldRef<"Lead", 'String'>
    readonly importBatchId: FieldRef<"Lead", 'String'>
    readonly customSource: FieldRef<"Lead", 'String'>
    readonly lastOperatorId: FieldRef<"Lead", 'String'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead.lastOperator
   */
  export type Lead$lastOperatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    where?: OperatorWhereInput
  }

  /**
   * Lead.histories
   */
  export type Lead$historiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    where?: LeadHistoryWhereInput
    orderBy?: LeadHistoryOrderByWithRelationInput | LeadHistoryOrderByWithRelationInput[]
    cursor?: LeadHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadHistoryScalarFieldEnum | LeadHistoryScalarFieldEnum[]
  }

  /**
   * Lead.leadNotes
   */
  export type Lead$leadNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    where?: LeadNoteWhereInput
    orderBy?: LeadNoteOrderByWithRelationInput | LeadNoteOrderByWithRelationInput[]
    cursor?: LeadNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadNoteScalarFieldEnum | LeadNoteScalarFieldEnum[]
  }

  /**
   * Lead.cadenceEngine
   */
  export type Lead$cadenceEngineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    where?: LeadCadenceProgressWhereInput
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model CadenceEngine
   */

  export type AggregateCadenceEngine = {
    _count: CadenceEngineCountAggregateOutputType | null
    _min: CadenceEngineMinAggregateOutputType | null
    _max: CadenceEngineMaxAggregateOutputType | null
  }

  export type CadenceEngineMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CadenceEngineMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CadenceEngineCountAggregateOutputType = {
    id: number
    profileId: number
    name: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CadenceEngineMinAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CadenceEngineMaxAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CadenceEngineCountAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CadenceEngineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CadenceEngine to aggregate.
     */
    where?: CadenceEngineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceEngines to fetch.
     */
    orderBy?: CadenceEngineOrderByWithRelationInput | CadenceEngineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CadenceEngineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceEngines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceEngines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CadenceEngines
    **/
    _count?: true | CadenceEngineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CadenceEngineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CadenceEngineMaxAggregateInputType
  }

  export type GetCadenceEngineAggregateType<T extends CadenceEngineAggregateArgs> = {
        [P in keyof T & keyof AggregateCadenceEngine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCadenceEngine[P]>
      : GetScalarType<T[P], AggregateCadenceEngine[P]>
  }




  export type CadenceEngineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CadenceEngineWhereInput
    orderBy?: CadenceEngineOrderByWithAggregationInput | CadenceEngineOrderByWithAggregationInput[]
    by: CadenceEngineScalarFieldEnum[] | CadenceEngineScalarFieldEnum
    having?: CadenceEngineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CadenceEngineCountAggregateInputType | true
    _min?: CadenceEngineMinAggregateInputType
    _max?: CadenceEngineMaxAggregateInputType
  }

  export type CadenceEngineGroupByOutputType = {
    id: string
    profileId: string | null
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CadenceEngineCountAggregateOutputType | null
    _min: CadenceEngineMinAggregateOutputType | null
    _max: CadenceEngineMaxAggregateOutputType | null
  }

  type GetCadenceEngineGroupByPayload<T extends CadenceEngineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CadenceEngineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CadenceEngineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CadenceEngineGroupByOutputType[P]>
            : GetScalarType<T[P], CadenceEngineGroupByOutputType[P]>
        }
      >
    >


  export type CadenceEngineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | CadenceEngine$profileArgs<ExtArgs>
    stages?: boolean | CadenceEngine$stagesArgs<ExtArgs>
    progressions?: boolean | CadenceEngine$progressionsArgs<ExtArgs>
    _count?: boolean | CadenceEngineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cadenceEngine"]>

  export type CadenceEngineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | CadenceEngine$profileArgs<ExtArgs>
  }, ExtArgs["result"]["cadenceEngine"]>

  export type CadenceEngineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | CadenceEngine$profileArgs<ExtArgs>
  }, ExtArgs["result"]["cadenceEngine"]>

  export type CadenceEngineSelectScalar = {
    id?: boolean
    profileId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CadenceEngineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "name" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["cadenceEngine"]>
  export type CadenceEngineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | CadenceEngine$profileArgs<ExtArgs>
    stages?: boolean | CadenceEngine$stagesArgs<ExtArgs>
    progressions?: boolean | CadenceEngine$progressionsArgs<ExtArgs>
    _count?: boolean | CadenceEngineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CadenceEngineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | CadenceEngine$profileArgs<ExtArgs>
  }
  export type CadenceEngineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | CadenceEngine$profileArgs<ExtArgs>
  }

  export type $CadenceEnginePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CadenceEngine"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      stages: Prisma.$CadenceStagePayload<ExtArgs>[]
      progressions: Prisma.$LeadCadenceProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string | null
      name: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cadenceEngine"]>
    composites: {}
  }

  type CadenceEngineGetPayload<S extends boolean | null | undefined | CadenceEngineDefaultArgs> = $Result.GetResult<Prisma.$CadenceEnginePayload, S>

  type CadenceEngineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CadenceEngineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CadenceEngineCountAggregateInputType | true
    }

  export interface CadenceEngineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CadenceEngine'], meta: { name: 'CadenceEngine' } }
    /**
     * Find zero or one CadenceEngine that matches the filter.
     * @param {CadenceEngineFindUniqueArgs} args - Arguments to find a CadenceEngine
     * @example
     * // Get one CadenceEngine
     * const cadenceEngine = await prisma.cadenceEngine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CadenceEngineFindUniqueArgs>(args: SelectSubset<T, CadenceEngineFindUniqueArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CadenceEngine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CadenceEngineFindUniqueOrThrowArgs} args - Arguments to find a CadenceEngine
     * @example
     * // Get one CadenceEngine
     * const cadenceEngine = await prisma.cadenceEngine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CadenceEngineFindUniqueOrThrowArgs>(args: SelectSubset<T, CadenceEngineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CadenceEngine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineFindFirstArgs} args - Arguments to find a CadenceEngine
     * @example
     * // Get one CadenceEngine
     * const cadenceEngine = await prisma.cadenceEngine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CadenceEngineFindFirstArgs>(args?: SelectSubset<T, CadenceEngineFindFirstArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CadenceEngine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineFindFirstOrThrowArgs} args - Arguments to find a CadenceEngine
     * @example
     * // Get one CadenceEngine
     * const cadenceEngine = await prisma.cadenceEngine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CadenceEngineFindFirstOrThrowArgs>(args?: SelectSubset<T, CadenceEngineFindFirstOrThrowArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CadenceEngines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CadenceEngines
     * const cadenceEngines = await prisma.cadenceEngine.findMany()
     * 
     * // Get first 10 CadenceEngines
     * const cadenceEngines = await prisma.cadenceEngine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cadenceEngineWithIdOnly = await prisma.cadenceEngine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CadenceEngineFindManyArgs>(args?: SelectSubset<T, CadenceEngineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CadenceEngine.
     * @param {CadenceEngineCreateArgs} args - Arguments to create a CadenceEngine.
     * @example
     * // Create one CadenceEngine
     * const CadenceEngine = await prisma.cadenceEngine.create({
     *   data: {
     *     // ... data to create a CadenceEngine
     *   }
     * })
     * 
     */
    create<T extends CadenceEngineCreateArgs>(args: SelectSubset<T, CadenceEngineCreateArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CadenceEngines.
     * @param {CadenceEngineCreateManyArgs} args - Arguments to create many CadenceEngines.
     * @example
     * // Create many CadenceEngines
     * const cadenceEngine = await prisma.cadenceEngine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CadenceEngineCreateManyArgs>(args?: SelectSubset<T, CadenceEngineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CadenceEngines and returns the data saved in the database.
     * @param {CadenceEngineCreateManyAndReturnArgs} args - Arguments to create many CadenceEngines.
     * @example
     * // Create many CadenceEngines
     * const cadenceEngine = await prisma.cadenceEngine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CadenceEngines and only return the `id`
     * const cadenceEngineWithIdOnly = await prisma.cadenceEngine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CadenceEngineCreateManyAndReturnArgs>(args?: SelectSubset<T, CadenceEngineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CadenceEngine.
     * @param {CadenceEngineDeleteArgs} args - Arguments to delete one CadenceEngine.
     * @example
     * // Delete one CadenceEngine
     * const CadenceEngine = await prisma.cadenceEngine.delete({
     *   where: {
     *     // ... filter to delete one CadenceEngine
     *   }
     * })
     * 
     */
    delete<T extends CadenceEngineDeleteArgs>(args: SelectSubset<T, CadenceEngineDeleteArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CadenceEngine.
     * @param {CadenceEngineUpdateArgs} args - Arguments to update one CadenceEngine.
     * @example
     * // Update one CadenceEngine
     * const cadenceEngine = await prisma.cadenceEngine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CadenceEngineUpdateArgs>(args: SelectSubset<T, CadenceEngineUpdateArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CadenceEngines.
     * @param {CadenceEngineDeleteManyArgs} args - Arguments to filter CadenceEngines to delete.
     * @example
     * // Delete a few CadenceEngines
     * const { count } = await prisma.cadenceEngine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CadenceEngineDeleteManyArgs>(args?: SelectSubset<T, CadenceEngineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CadenceEngines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CadenceEngines
     * const cadenceEngine = await prisma.cadenceEngine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CadenceEngineUpdateManyArgs>(args: SelectSubset<T, CadenceEngineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CadenceEngines and returns the data updated in the database.
     * @param {CadenceEngineUpdateManyAndReturnArgs} args - Arguments to update many CadenceEngines.
     * @example
     * // Update many CadenceEngines
     * const cadenceEngine = await prisma.cadenceEngine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CadenceEngines and only return the `id`
     * const cadenceEngineWithIdOnly = await prisma.cadenceEngine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CadenceEngineUpdateManyAndReturnArgs>(args: SelectSubset<T, CadenceEngineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CadenceEngine.
     * @param {CadenceEngineUpsertArgs} args - Arguments to update or create a CadenceEngine.
     * @example
     * // Update or create a CadenceEngine
     * const cadenceEngine = await prisma.cadenceEngine.upsert({
     *   create: {
     *     // ... data to create a CadenceEngine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CadenceEngine we want to update
     *   }
     * })
     */
    upsert<T extends CadenceEngineUpsertArgs>(args: SelectSubset<T, CadenceEngineUpsertArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CadenceEngines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineCountArgs} args - Arguments to filter CadenceEngines to count.
     * @example
     * // Count the number of CadenceEngines
     * const count = await prisma.cadenceEngine.count({
     *   where: {
     *     // ... the filter for the CadenceEngines we want to count
     *   }
     * })
    **/
    count<T extends CadenceEngineCountArgs>(
      args?: Subset<T, CadenceEngineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CadenceEngineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CadenceEngine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CadenceEngineAggregateArgs>(args: Subset<T, CadenceEngineAggregateArgs>): Prisma.PrismaPromise<GetCadenceEngineAggregateType<T>>

    /**
     * Group by CadenceEngine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceEngineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CadenceEngineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CadenceEngineGroupByArgs['orderBy'] }
        : { orderBy?: CadenceEngineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CadenceEngineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCadenceEngineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CadenceEngine model
   */
  readonly fields: CadenceEngineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CadenceEngine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CadenceEngineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends CadenceEngine$profileArgs<ExtArgs> = {}>(args?: Subset<T, CadenceEngine$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    stages<T extends CadenceEngine$stagesArgs<ExtArgs> = {}>(args?: Subset<T, CadenceEngine$stagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    progressions<T extends CadenceEngine$progressionsArgs<ExtArgs> = {}>(args?: Subset<T, CadenceEngine$progressionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CadenceEngine model
   */
  interface CadenceEngineFieldRefs {
    readonly id: FieldRef<"CadenceEngine", 'String'>
    readonly profileId: FieldRef<"CadenceEngine", 'String'>
    readonly name: FieldRef<"CadenceEngine", 'String'>
    readonly description: FieldRef<"CadenceEngine", 'String'>
    readonly isActive: FieldRef<"CadenceEngine", 'Boolean'>
    readonly createdAt: FieldRef<"CadenceEngine", 'DateTime'>
    readonly updatedAt: FieldRef<"CadenceEngine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CadenceEngine findUnique
   */
  export type CadenceEngineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * Filter, which CadenceEngine to fetch.
     */
    where: CadenceEngineWhereUniqueInput
  }

  /**
   * CadenceEngine findUniqueOrThrow
   */
  export type CadenceEngineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * Filter, which CadenceEngine to fetch.
     */
    where: CadenceEngineWhereUniqueInput
  }

  /**
   * CadenceEngine findFirst
   */
  export type CadenceEngineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * Filter, which CadenceEngine to fetch.
     */
    where?: CadenceEngineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceEngines to fetch.
     */
    orderBy?: CadenceEngineOrderByWithRelationInput | CadenceEngineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CadenceEngines.
     */
    cursor?: CadenceEngineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceEngines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceEngines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CadenceEngines.
     */
    distinct?: CadenceEngineScalarFieldEnum | CadenceEngineScalarFieldEnum[]
  }

  /**
   * CadenceEngine findFirstOrThrow
   */
  export type CadenceEngineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * Filter, which CadenceEngine to fetch.
     */
    where?: CadenceEngineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceEngines to fetch.
     */
    orderBy?: CadenceEngineOrderByWithRelationInput | CadenceEngineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CadenceEngines.
     */
    cursor?: CadenceEngineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceEngines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceEngines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CadenceEngines.
     */
    distinct?: CadenceEngineScalarFieldEnum | CadenceEngineScalarFieldEnum[]
  }

  /**
   * CadenceEngine findMany
   */
  export type CadenceEngineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * Filter, which CadenceEngines to fetch.
     */
    where?: CadenceEngineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceEngines to fetch.
     */
    orderBy?: CadenceEngineOrderByWithRelationInput | CadenceEngineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CadenceEngines.
     */
    cursor?: CadenceEngineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceEngines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceEngines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CadenceEngines.
     */
    distinct?: CadenceEngineScalarFieldEnum | CadenceEngineScalarFieldEnum[]
  }

  /**
   * CadenceEngine create
   */
  export type CadenceEngineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * The data needed to create a CadenceEngine.
     */
    data: XOR<CadenceEngineCreateInput, CadenceEngineUncheckedCreateInput>
  }

  /**
   * CadenceEngine createMany
   */
  export type CadenceEngineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CadenceEngines.
     */
    data: CadenceEngineCreateManyInput | CadenceEngineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CadenceEngine createManyAndReturn
   */
  export type CadenceEngineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * The data used to create many CadenceEngines.
     */
    data: CadenceEngineCreateManyInput | CadenceEngineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CadenceEngine update
   */
  export type CadenceEngineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * The data needed to update a CadenceEngine.
     */
    data: XOR<CadenceEngineUpdateInput, CadenceEngineUncheckedUpdateInput>
    /**
     * Choose, which CadenceEngine to update.
     */
    where: CadenceEngineWhereUniqueInput
  }

  /**
   * CadenceEngine updateMany
   */
  export type CadenceEngineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CadenceEngines.
     */
    data: XOR<CadenceEngineUpdateManyMutationInput, CadenceEngineUncheckedUpdateManyInput>
    /**
     * Filter which CadenceEngines to update
     */
    where?: CadenceEngineWhereInput
    /**
     * Limit how many CadenceEngines to update.
     */
    limit?: number
  }

  /**
   * CadenceEngine updateManyAndReturn
   */
  export type CadenceEngineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * The data used to update CadenceEngines.
     */
    data: XOR<CadenceEngineUpdateManyMutationInput, CadenceEngineUncheckedUpdateManyInput>
    /**
     * Filter which CadenceEngines to update
     */
    where?: CadenceEngineWhereInput
    /**
     * Limit how many CadenceEngines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CadenceEngine upsert
   */
  export type CadenceEngineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * The filter to search for the CadenceEngine to update in case it exists.
     */
    where: CadenceEngineWhereUniqueInput
    /**
     * In case the CadenceEngine found by the `where` argument doesn't exist, create a new CadenceEngine with this data.
     */
    create: XOR<CadenceEngineCreateInput, CadenceEngineUncheckedCreateInput>
    /**
     * In case the CadenceEngine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CadenceEngineUpdateInput, CadenceEngineUncheckedUpdateInput>
  }

  /**
   * CadenceEngine delete
   */
  export type CadenceEngineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
    /**
     * Filter which CadenceEngine to delete.
     */
    where: CadenceEngineWhereUniqueInput
  }

  /**
   * CadenceEngine deleteMany
   */
  export type CadenceEngineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CadenceEngines to delete
     */
    where?: CadenceEngineWhereInput
    /**
     * Limit how many CadenceEngines to delete.
     */
    limit?: number
  }

  /**
   * CadenceEngine.profile
   */
  export type CadenceEngine$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * CadenceEngine.stages
   */
  export type CadenceEngine$stagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    where?: CadenceStageWhereInput
    orderBy?: CadenceStageOrderByWithRelationInput | CadenceStageOrderByWithRelationInput[]
    cursor?: CadenceStageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CadenceStageScalarFieldEnum | CadenceStageScalarFieldEnum[]
  }

  /**
   * CadenceEngine.progressions
   */
  export type CadenceEngine$progressionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    where?: LeadCadenceProgressWhereInput
    orderBy?: LeadCadenceProgressOrderByWithRelationInput | LeadCadenceProgressOrderByWithRelationInput[]
    cursor?: LeadCadenceProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadCadenceProgressScalarFieldEnum | LeadCadenceProgressScalarFieldEnum[]
  }

  /**
   * CadenceEngine without action
   */
  export type CadenceEngineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceEngine
     */
    select?: CadenceEngineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceEngine
     */
    omit?: CadenceEngineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceEngineInclude<ExtArgs> | null
  }


  /**
   * Model CadenceStage
   */

  export type AggregateCadenceStage = {
    _count: CadenceStageCountAggregateOutputType | null
    _avg: CadenceStageAvgAggregateOutputType | null
    _sum: CadenceStageSumAggregateOutputType | null
    _min: CadenceStageMinAggregateOutputType | null
    _max: CadenceStageMaxAggregateOutputType | null
  }

  export type CadenceStageAvgAggregateOutputType = {
    order: number | null
    delayDays: number | null
  }

  export type CadenceStageSumAggregateOutputType = {
    order: number | null
    delayDays: number | null
  }

  export type CadenceStageMinAggregateOutputType = {
    id: string | null
    cadenceId: string | null
    order: number | null
    channel: $Enums.TemplateChannel | null
    delayDays: number | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CadenceStageMaxAggregateOutputType = {
    id: string | null
    cadenceId: string | null
    order: number | null
    channel: $Enums.TemplateChannel | null
    delayDays: number | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CadenceStageCountAggregateOutputType = {
    id: number
    cadenceId: number
    order: number
    channel: number
    delayDays: number
    templateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CadenceStageAvgAggregateInputType = {
    order?: true
    delayDays?: true
  }

  export type CadenceStageSumAggregateInputType = {
    order?: true
    delayDays?: true
  }

  export type CadenceStageMinAggregateInputType = {
    id?: true
    cadenceId?: true
    order?: true
    channel?: true
    delayDays?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CadenceStageMaxAggregateInputType = {
    id?: true
    cadenceId?: true
    order?: true
    channel?: true
    delayDays?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CadenceStageCountAggregateInputType = {
    id?: true
    cadenceId?: true
    order?: true
    channel?: true
    delayDays?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CadenceStageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CadenceStage to aggregate.
     */
    where?: CadenceStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceStages to fetch.
     */
    orderBy?: CadenceStageOrderByWithRelationInput | CadenceStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CadenceStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CadenceStages
    **/
    _count?: true | CadenceStageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CadenceStageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CadenceStageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CadenceStageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CadenceStageMaxAggregateInputType
  }

  export type GetCadenceStageAggregateType<T extends CadenceStageAggregateArgs> = {
        [P in keyof T & keyof AggregateCadenceStage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCadenceStage[P]>
      : GetScalarType<T[P], AggregateCadenceStage[P]>
  }




  export type CadenceStageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CadenceStageWhereInput
    orderBy?: CadenceStageOrderByWithAggregationInput | CadenceStageOrderByWithAggregationInput[]
    by: CadenceStageScalarFieldEnum[] | CadenceStageScalarFieldEnum
    having?: CadenceStageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CadenceStageCountAggregateInputType | true
    _avg?: CadenceStageAvgAggregateInputType
    _sum?: CadenceStageSumAggregateInputType
    _min?: CadenceStageMinAggregateInputType
    _max?: CadenceStageMaxAggregateInputType
  }

  export type CadenceStageGroupByOutputType = {
    id: string
    cadenceId: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    templateId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CadenceStageCountAggregateOutputType | null
    _avg: CadenceStageAvgAggregateOutputType | null
    _sum: CadenceStageSumAggregateOutputType | null
    _min: CadenceStageMinAggregateOutputType | null
    _max: CadenceStageMaxAggregateOutputType | null
  }

  type GetCadenceStageGroupByPayload<T extends CadenceStageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CadenceStageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CadenceStageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CadenceStageGroupByOutputType[P]>
            : GetScalarType<T[P], CadenceStageGroupByOutputType[P]>
        }
      >
    >


  export type CadenceStageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cadenceId?: boolean
    order?: boolean
    channel?: boolean
    delayDays?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    template?: boolean | CadenceStage$templateArgs<ExtArgs>
  }, ExtArgs["result"]["cadenceStage"]>

  export type CadenceStageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cadenceId?: boolean
    order?: boolean
    channel?: boolean
    delayDays?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    template?: boolean | CadenceStage$templateArgs<ExtArgs>
  }, ExtArgs["result"]["cadenceStage"]>

  export type CadenceStageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cadenceId?: boolean
    order?: boolean
    channel?: boolean
    delayDays?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    template?: boolean | CadenceStage$templateArgs<ExtArgs>
  }, ExtArgs["result"]["cadenceStage"]>

  export type CadenceStageSelectScalar = {
    id?: boolean
    cadenceId?: boolean
    order?: boolean
    channel?: boolean
    delayDays?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CadenceStageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cadenceId" | "order" | "channel" | "delayDays" | "templateId" | "createdAt" | "updatedAt", ExtArgs["result"]["cadenceStage"]>
  export type CadenceStageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    template?: boolean | CadenceStage$templateArgs<ExtArgs>
  }
  export type CadenceStageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    template?: boolean | CadenceStage$templateArgs<ExtArgs>
  }
  export type CadenceStageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    template?: boolean | CadenceStage$templateArgs<ExtArgs>
  }

  export type $CadenceStagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CadenceStage"
    objects: {
      cadence: Prisma.$CadenceEnginePayload<ExtArgs>
      template: Prisma.$TemplatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cadenceId: string
      order: number
      channel: $Enums.TemplateChannel
      delayDays: number
      templateId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cadenceStage"]>
    composites: {}
  }

  type CadenceStageGetPayload<S extends boolean | null | undefined | CadenceStageDefaultArgs> = $Result.GetResult<Prisma.$CadenceStagePayload, S>

  type CadenceStageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CadenceStageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CadenceStageCountAggregateInputType | true
    }

  export interface CadenceStageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CadenceStage'], meta: { name: 'CadenceStage' } }
    /**
     * Find zero or one CadenceStage that matches the filter.
     * @param {CadenceStageFindUniqueArgs} args - Arguments to find a CadenceStage
     * @example
     * // Get one CadenceStage
     * const cadenceStage = await prisma.cadenceStage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CadenceStageFindUniqueArgs>(args: SelectSubset<T, CadenceStageFindUniqueArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CadenceStage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CadenceStageFindUniqueOrThrowArgs} args - Arguments to find a CadenceStage
     * @example
     * // Get one CadenceStage
     * const cadenceStage = await prisma.cadenceStage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CadenceStageFindUniqueOrThrowArgs>(args: SelectSubset<T, CadenceStageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CadenceStage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageFindFirstArgs} args - Arguments to find a CadenceStage
     * @example
     * // Get one CadenceStage
     * const cadenceStage = await prisma.cadenceStage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CadenceStageFindFirstArgs>(args?: SelectSubset<T, CadenceStageFindFirstArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CadenceStage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageFindFirstOrThrowArgs} args - Arguments to find a CadenceStage
     * @example
     * // Get one CadenceStage
     * const cadenceStage = await prisma.cadenceStage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CadenceStageFindFirstOrThrowArgs>(args?: SelectSubset<T, CadenceStageFindFirstOrThrowArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CadenceStages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CadenceStages
     * const cadenceStages = await prisma.cadenceStage.findMany()
     * 
     * // Get first 10 CadenceStages
     * const cadenceStages = await prisma.cadenceStage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cadenceStageWithIdOnly = await prisma.cadenceStage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CadenceStageFindManyArgs>(args?: SelectSubset<T, CadenceStageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CadenceStage.
     * @param {CadenceStageCreateArgs} args - Arguments to create a CadenceStage.
     * @example
     * // Create one CadenceStage
     * const CadenceStage = await prisma.cadenceStage.create({
     *   data: {
     *     // ... data to create a CadenceStage
     *   }
     * })
     * 
     */
    create<T extends CadenceStageCreateArgs>(args: SelectSubset<T, CadenceStageCreateArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CadenceStages.
     * @param {CadenceStageCreateManyArgs} args - Arguments to create many CadenceStages.
     * @example
     * // Create many CadenceStages
     * const cadenceStage = await prisma.cadenceStage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CadenceStageCreateManyArgs>(args?: SelectSubset<T, CadenceStageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CadenceStages and returns the data saved in the database.
     * @param {CadenceStageCreateManyAndReturnArgs} args - Arguments to create many CadenceStages.
     * @example
     * // Create many CadenceStages
     * const cadenceStage = await prisma.cadenceStage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CadenceStages and only return the `id`
     * const cadenceStageWithIdOnly = await prisma.cadenceStage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CadenceStageCreateManyAndReturnArgs>(args?: SelectSubset<T, CadenceStageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CadenceStage.
     * @param {CadenceStageDeleteArgs} args - Arguments to delete one CadenceStage.
     * @example
     * // Delete one CadenceStage
     * const CadenceStage = await prisma.cadenceStage.delete({
     *   where: {
     *     // ... filter to delete one CadenceStage
     *   }
     * })
     * 
     */
    delete<T extends CadenceStageDeleteArgs>(args: SelectSubset<T, CadenceStageDeleteArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CadenceStage.
     * @param {CadenceStageUpdateArgs} args - Arguments to update one CadenceStage.
     * @example
     * // Update one CadenceStage
     * const cadenceStage = await prisma.cadenceStage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CadenceStageUpdateArgs>(args: SelectSubset<T, CadenceStageUpdateArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CadenceStages.
     * @param {CadenceStageDeleteManyArgs} args - Arguments to filter CadenceStages to delete.
     * @example
     * // Delete a few CadenceStages
     * const { count } = await prisma.cadenceStage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CadenceStageDeleteManyArgs>(args?: SelectSubset<T, CadenceStageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CadenceStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CadenceStages
     * const cadenceStage = await prisma.cadenceStage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CadenceStageUpdateManyArgs>(args: SelectSubset<T, CadenceStageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CadenceStages and returns the data updated in the database.
     * @param {CadenceStageUpdateManyAndReturnArgs} args - Arguments to update many CadenceStages.
     * @example
     * // Update many CadenceStages
     * const cadenceStage = await prisma.cadenceStage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CadenceStages and only return the `id`
     * const cadenceStageWithIdOnly = await prisma.cadenceStage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CadenceStageUpdateManyAndReturnArgs>(args: SelectSubset<T, CadenceStageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CadenceStage.
     * @param {CadenceStageUpsertArgs} args - Arguments to update or create a CadenceStage.
     * @example
     * // Update or create a CadenceStage
     * const cadenceStage = await prisma.cadenceStage.upsert({
     *   create: {
     *     // ... data to create a CadenceStage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CadenceStage we want to update
     *   }
     * })
     */
    upsert<T extends CadenceStageUpsertArgs>(args: SelectSubset<T, CadenceStageUpsertArgs<ExtArgs>>): Prisma__CadenceStageClient<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CadenceStages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageCountArgs} args - Arguments to filter CadenceStages to count.
     * @example
     * // Count the number of CadenceStages
     * const count = await prisma.cadenceStage.count({
     *   where: {
     *     // ... the filter for the CadenceStages we want to count
     *   }
     * })
    **/
    count<T extends CadenceStageCountArgs>(
      args?: Subset<T, CadenceStageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CadenceStageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CadenceStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CadenceStageAggregateArgs>(args: Subset<T, CadenceStageAggregateArgs>): Prisma.PrismaPromise<GetCadenceStageAggregateType<T>>

    /**
     * Group by CadenceStage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CadenceStageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CadenceStageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CadenceStageGroupByArgs['orderBy'] }
        : { orderBy?: CadenceStageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CadenceStageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCadenceStageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CadenceStage model
   */
  readonly fields: CadenceStageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CadenceStage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CadenceStageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cadence<T extends CadenceEngineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CadenceEngineDefaultArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    template<T extends CadenceStage$templateArgs<ExtArgs> = {}>(args?: Subset<T, CadenceStage$templateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CadenceStage model
   */
  interface CadenceStageFieldRefs {
    readonly id: FieldRef<"CadenceStage", 'String'>
    readonly cadenceId: FieldRef<"CadenceStage", 'String'>
    readonly order: FieldRef<"CadenceStage", 'Int'>
    readonly channel: FieldRef<"CadenceStage", 'TemplateChannel'>
    readonly delayDays: FieldRef<"CadenceStage", 'Int'>
    readonly templateId: FieldRef<"CadenceStage", 'String'>
    readonly createdAt: FieldRef<"CadenceStage", 'DateTime'>
    readonly updatedAt: FieldRef<"CadenceStage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CadenceStage findUnique
   */
  export type CadenceStageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * Filter, which CadenceStage to fetch.
     */
    where: CadenceStageWhereUniqueInput
  }

  /**
   * CadenceStage findUniqueOrThrow
   */
  export type CadenceStageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * Filter, which CadenceStage to fetch.
     */
    where: CadenceStageWhereUniqueInput
  }

  /**
   * CadenceStage findFirst
   */
  export type CadenceStageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * Filter, which CadenceStage to fetch.
     */
    where?: CadenceStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceStages to fetch.
     */
    orderBy?: CadenceStageOrderByWithRelationInput | CadenceStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CadenceStages.
     */
    cursor?: CadenceStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CadenceStages.
     */
    distinct?: CadenceStageScalarFieldEnum | CadenceStageScalarFieldEnum[]
  }

  /**
   * CadenceStage findFirstOrThrow
   */
  export type CadenceStageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * Filter, which CadenceStage to fetch.
     */
    where?: CadenceStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceStages to fetch.
     */
    orderBy?: CadenceStageOrderByWithRelationInput | CadenceStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CadenceStages.
     */
    cursor?: CadenceStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CadenceStages.
     */
    distinct?: CadenceStageScalarFieldEnum | CadenceStageScalarFieldEnum[]
  }

  /**
   * CadenceStage findMany
   */
  export type CadenceStageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * Filter, which CadenceStages to fetch.
     */
    where?: CadenceStageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CadenceStages to fetch.
     */
    orderBy?: CadenceStageOrderByWithRelationInput | CadenceStageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CadenceStages.
     */
    cursor?: CadenceStageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CadenceStages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CadenceStages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CadenceStages.
     */
    distinct?: CadenceStageScalarFieldEnum | CadenceStageScalarFieldEnum[]
  }

  /**
   * CadenceStage create
   */
  export type CadenceStageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * The data needed to create a CadenceStage.
     */
    data: XOR<CadenceStageCreateInput, CadenceStageUncheckedCreateInput>
  }

  /**
   * CadenceStage createMany
   */
  export type CadenceStageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CadenceStages.
     */
    data: CadenceStageCreateManyInput | CadenceStageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CadenceStage createManyAndReturn
   */
  export type CadenceStageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * The data used to create many CadenceStages.
     */
    data: CadenceStageCreateManyInput | CadenceStageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CadenceStage update
   */
  export type CadenceStageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * The data needed to update a CadenceStage.
     */
    data: XOR<CadenceStageUpdateInput, CadenceStageUncheckedUpdateInput>
    /**
     * Choose, which CadenceStage to update.
     */
    where: CadenceStageWhereUniqueInput
  }

  /**
   * CadenceStage updateMany
   */
  export type CadenceStageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CadenceStages.
     */
    data: XOR<CadenceStageUpdateManyMutationInput, CadenceStageUncheckedUpdateManyInput>
    /**
     * Filter which CadenceStages to update
     */
    where?: CadenceStageWhereInput
    /**
     * Limit how many CadenceStages to update.
     */
    limit?: number
  }

  /**
   * CadenceStage updateManyAndReturn
   */
  export type CadenceStageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * The data used to update CadenceStages.
     */
    data: XOR<CadenceStageUpdateManyMutationInput, CadenceStageUncheckedUpdateManyInput>
    /**
     * Filter which CadenceStages to update
     */
    where?: CadenceStageWhereInput
    /**
     * Limit how many CadenceStages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CadenceStage upsert
   */
  export type CadenceStageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * The filter to search for the CadenceStage to update in case it exists.
     */
    where: CadenceStageWhereUniqueInput
    /**
     * In case the CadenceStage found by the `where` argument doesn't exist, create a new CadenceStage with this data.
     */
    create: XOR<CadenceStageCreateInput, CadenceStageUncheckedCreateInput>
    /**
     * In case the CadenceStage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CadenceStageUpdateInput, CadenceStageUncheckedUpdateInput>
  }

  /**
   * CadenceStage delete
   */
  export type CadenceStageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    /**
     * Filter which CadenceStage to delete.
     */
    where: CadenceStageWhereUniqueInput
  }

  /**
   * CadenceStage deleteMany
   */
  export type CadenceStageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CadenceStages to delete
     */
    where?: CadenceStageWhereInput
    /**
     * Limit how many CadenceStages to delete.
     */
    limit?: number
  }

  /**
   * CadenceStage.template
   */
  export type CadenceStage$templateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    where?: TemplateWhereInput
  }

  /**
   * CadenceStage without action
   */
  export type CadenceStageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
  }


  /**
   * Model LeadCadenceProgress
   */

  export type AggregateLeadCadenceProgress = {
    _count: LeadCadenceProgressCountAggregateOutputType | null
    _avg: LeadCadenceProgressAvgAggregateOutputType | null
    _sum: LeadCadenceProgressSumAggregateOutputType | null
    _min: LeadCadenceProgressMinAggregateOutputType | null
    _max: LeadCadenceProgressMaxAggregateOutputType | null
  }

  export type LeadCadenceProgressAvgAggregateOutputType = {
    currentStageOrder: number | null
    nextStageOrder: number | null
    version: number | null
  }

  export type LeadCadenceProgressSumAggregateOutputType = {
    currentStageOrder: number | null
    nextStageOrder: number | null
    version: number | null
  }

  export type LeadCadenceProgressMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    leadId: string | null
    cadenceId: string | null
    currentStageOrder: number | null
    nextStageOrder: number | null
    status: $Enums.CadenceStatus | null
    pausedAt: Date | null
    finishedAt: Date | null
    exitReason: string | null
    nextScheduledAt: Date | null
    lastActionAt: Date | null
    version: number | null
    lockedAt: Date | null
    lockedBy: string | null
  }

  export type LeadCadenceProgressMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    leadId: string | null
    cadenceId: string | null
    currentStageOrder: number | null
    nextStageOrder: number | null
    status: $Enums.CadenceStatus | null
    pausedAt: Date | null
    finishedAt: Date | null
    exitReason: string | null
    nextScheduledAt: Date | null
    lastActionAt: Date | null
    version: number | null
    lockedAt: Date | null
    lockedBy: string | null
  }

  export type LeadCadenceProgressCountAggregateOutputType = {
    id: number
    profileId: number
    leadId: number
    cadenceId: number
    currentStageOrder: number
    nextStageOrder: number
    status: number
    pausedAt: number
    finishedAt: number
    exitReason: number
    nextScheduledAt: number
    lastActionAt: number
    version: number
    lockedAt: number
    lockedBy: number
    _all: number
  }


  export type LeadCadenceProgressAvgAggregateInputType = {
    currentStageOrder?: true
    nextStageOrder?: true
    version?: true
  }

  export type LeadCadenceProgressSumAggregateInputType = {
    currentStageOrder?: true
    nextStageOrder?: true
    version?: true
  }

  export type LeadCadenceProgressMinAggregateInputType = {
    id?: true
    profileId?: true
    leadId?: true
    cadenceId?: true
    currentStageOrder?: true
    nextStageOrder?: true
    status?: true
    pausedAt?: true
    finishedAt?: true
    exitReason?: true
    nextScheduledAt?: true
    lastActionAt?: true
    version?: true
    lockedAt?: true
    lockedBy?: true
  }

  export type LeadCadenceProgressMaxAggregateInputType = {
    id?: true
    profileId?: true
    leadId?: true
    cadenceId?: true
    currentStageOrder?: true
    nextStageOrder?: true
    status?: true
    pausedAt?: true
    finishedAt?: true
    exitReason?: true
    nextScheduledAt?: true
    lastActionAt?: true
    version?: true
    lockedAt?: true
    lockedBy?: true
  }

  export type LeadCadenceProgressCountAggregateInputType = {
    id?: true
    profileId?: true
    leadId?: true
    cadenceId?: true
    currentStageOrder?: true
    nextStageOrder?: true
    status?: true
    pausedAt?: true
    finishedAt?: true
    exitReason?: true
    nextScheduledAt?: true
    lastActionAt?: true
    version?: true
    lockedAt?: true
    lockedBy?: true
    _all?: true
  }

  export type LeadCadenceProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadCadenceProgress to aggregate.
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceProgresses to fetch.
     */
    orderBy?: LeadCadenceProgressOrderByWithRelationInput | LeadCadenceProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadCadenceProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadCadenceProgresses
    **/
    _count?: true | LeadCadenceProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadCadenceProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadCadenceProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadCadenceProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadCadenceProgressMaxAggregateInputType
  }

  export type GetLeadCadenceProgressAggregateType<T extends LeadCadenceProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadCadenceProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadCadenceProgress[P]>
      : GetScalarType<T[P], AggregateLeadCadenceProgress[P]>
  }




  export type LeadCadenceProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadCadenceProgressWhereInput
    orderBy?: LeadCadenceProgressOrderByWithAggregationInput | LeadCadenceProgressOrderByWithAggregationInput[]
    by: LeadCadenceProgressScalarFieldEnum[] | LeadCadenceProgressScalarFieldEnum
    having?: LeadCadenceProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCadenceProgressCountAggregateInputType | true
    _avg?: LeadCadenceProgressAvgAggregateInputType
    _sum?: LeadCadenceProgressSumAggregateInputType
    _min?: LeadCadenceProgressMinAggregateInputType
    _max?: LeadCadenceProgressMaxAggregateInputType
  }

  export type LeadCadenceProgressGroupByOutputType = {
    id: string
    profileId: string
    leadId: string
    cadenceId: string
    currentStageOrder: number
    nextStageOrder: number | null
    status: $Enums.CadenceStatus
    pausedAt: Date | null
    finishedAt: Date | null
    exitReason: string | null
    nextScheduledAt: Date
    lastActionAt: Date
    version: number
    lockedAt: Date | null
    lockedBy: string | null
    _count: LeadCadenceProgressCountAggregateOutputType | null
    _avg: LeadCadenceProgressAvgAggregateOutputType | null
    _sum: LeadCadenceProgressSumAggregateOutputType | null
    _min: LeadCadenceProgressMinAggregateOutputType | null
    _max: LeadCadenceProgressMaxAggregateOutputType | null
  }

  type GetLeadCadenceProgressGroupByPayload<T extends LeadCadenceProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadCadenceProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadCadenceProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadCadenceProgressGroupByOutputType[P]>
            : GetScalarType<T[P], LeadCadenceProgressGroupByOutputType[P]>
        }
      >
    >


  export type LeadCadenceProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    cadenceId?: boolean
    currentStageOrder?: boolean
    nextStageOrder?: boolean
    status?: boolean
    pausedAt?: boolean
    finishedAt?: boolean
    exitReason?: boolean
    nextScheduledAt?: boolean
    lastActionAt?: boolean
    version?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    events?: boolean | LeadCadenceProgress$eventsArgs<ExtArgs>
    _count?: boolean | LeadCadenceProgressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadCadenceProgress"]>

  export type LeadCadenceProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    cadenceId?: boolean
    currentStageOrder?: boolean
    nextStageOrder?: boolean
    status?: boolean
    pausedAt?: boolean
    finishedAt?: boolean
    exitReason?: boolean
    nextScheduledAt?: boolean
    lastActionAt?: boolean
    version?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadCadenceProgress"]>

  export type LeadCadenceProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    cadenceId?: boolean
    currentStageOrder?: boolean
    nextStageOrder?: boolean
    status?: boolean
    pausedAt?: boolean
    finishedAt?: boolean
    exitReason?: boolean
    nextScheduledAt?: boolean
    lastActionAt?: boolean
    version?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadCadenceProgress"]>

  export type LeadCadenceProgressSelectScalar = {
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    cadenceId?: boolean
    currentStageOrder?: boolean
    nextStageOrder?: boolean
    status?: boolean
    pausedAt?: boolean
    finishedAt?: boolean
    exitReason?: boolean
    nextScheduledAt?: boolean
    lastActionAt?: boolean
    version?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }

  export type LeadCadenceProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "leadId" | "cadenceId" | "currentStageOrder" | "nextStageOrder" | "status" | "pausedAt" | "finishedAt" | "exitReason" | "nextScheduledAt" | "lastActionAt" | "version" | "lockedAt" | "lockedBy", ExtArgs["result"]["leadCadenceProgress"]>
  export type LeadCadenceProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
    events?: boolean | LeadCadenceProgress$eventsArgs<ExtArgs>
    _count?: boolean | LeadCadenceProgressCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadCadenceProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
  }
  export type LeadCadenceProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    cadence?: boolean | CadenceEngineDefaultArgs<ExtArgs>
  }

  export type $LeadCadenceProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadCadenceProgress"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
      cadence: Prisma.$CadenceEnginePayload<ExtArgs>
      events: Prisma.$LeadCadenceEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      leadId: string
      cadenceId: string
      currentStageOrder: number
      nextStageOrder: number | null
      status: $Enums.CadenceStatus
      pausedAt: Date | null
      finishedAt: Date | null
      exitReason: string | null
      nextScheduledAt: Date
      lastActionAt: Date
      version: number
      lockedAt: Date | null
      lockedBy: string | null
    }, ExtArgs["result"]["leadCadenceProgress"]>
    composites: {}
  }

  type LeadCadenceProgressGetPayload<S extends boolean | null | undefined | LeadCadenceProgressDefaultArgs> = $Result.GetResult<Prisma.$LeadCadenceProgressPayload, S>

  type LeadCadenceProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadCadenceProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCadenceProgressCountAggregateInputType | true
    }

  export interface LeadCadenceProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadCadenceProgress'], meta: { name: 'LeadCadenceProgress' } }
    /**
     * Find zero or one LeadCadenceProgress that matches the filter.
     * @param {LeadCadenceProgressFindUniqueArgs} args - Arguments to find a LeadCadenceProgress
     * @example
     * // Get one LeadCadenceProgress
     * const leadCadenceProgress = await prisma.leadCadenceProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadCadenceProgressFindUniqueArgs>(args: SelectSubset<T, LeadCadenceProgressFindUniqueArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadCadenceProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadCadenceProgressFindUniqueOrThrowArgs} args - Arguments to find a LeadCadenceProgress
     * @example
     * // Get one LeadCadenceProgress
     * const leadCadenceProgress = await prisma.leadCadenceProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadCadenceProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadCadenceProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadCadenceProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressFindFirstArgs} args - Arguments to find a LeadCadenceProgress
     * @example
     * // Get one LeadCadenceProgress
     * const leadCadenceProgress = await prisma.leadCadenceProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadCadenceProgressFindFirstArgs>(args?: SelectSubset<T, LeadCadenceProgressFindFirstArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadCadenceProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressFindFirstOrThrowArgs} args - Arguments to find a LeadCadenceProgress
     * @example
     * // Get one LeadCadenceProgress
     * const leadCadenceProgress = await prisma.leadCadenceProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadCadenceProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadCadenceProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadCadenceProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadCadenceProgresses
     * const leadCadenceProgresses = await prisma.leadCadenceProgress.findMany()
     * 
     * // Get first 10 LeadCadenceProgresses
     * const leadCadenceProgresses = await prisma.leadCadenceProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadCadenceProgressWithIdOnly = await prisma.leadCadenceProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadCadenceProgressFindManyArgs>(args?: SelectSubset<T, LeadCadenceProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadCadenceProgress.
     * @param {LeadCadenceProgressCreateArgs} args - Arguments to create a LeadCadenceProgress.
     * @example
     * // Create one LeadCadenceProgress
     * const LeadCadenceProgress = await prisma.leadCadenceProgress.create({
     *   data: {
     *     // ... data to create a LeadCadenceProgress
     *   }
     * })
     * 
     */
    create<T extends LeadCadenceProgressCreateArgs>(args: SelectSubset<T, LeadCadenceProgressCreateArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadCadenceProgresses.
     * @param {LeadCadenceProgressCreateManyArgs} args - Arguments to create many LeadCadenceProgresses.
     * @example
     * // Create many LeadCadenceProgresses
     * const leadCadenceProgress = await prisma.leadCadenceProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCadenceProgressCreateManyArgs>(args?: SelectSubset<T, LeadCadenceProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadCadenceProgresses and returns the data saved in the database.
     * @param {LeadCadenceProgressCreateManyAndReturnArgs} args - Arguments to create many LeadCadenceProgresses.
     * @example
     * // Create many LeadCadenceProgresses
     * const leadCadenceProgress = await prisma.leadCadenceProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadCadenceProgresses and only return the `id`
     * const leadCadenceProgressWithIdOnly = await prisma.leadCadenceProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCadenceProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCadenceProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadCadenceProgress.
     * @param {LeadCadenceProgressDeleteArgs} args - Arguments to delete one LeadCadenceProgress.
     * @example
     * // Delete one LeadCadenceProgress
     * const LeadCadenceProgress = await prisma.leadCadenceProgress.delete({
     *   where: {
     *     // ... filter to delete one LeadCadenceProgress
     *   }
     * })
     * 
     */
    delete<T extends LeadCadenceProgressDeleteArgs>(args: SelectSubset<T, LeadCadenceProgressDeleteArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadCadenceProgress.
     * @param {LeadCadenceProgressUpdateArgs} args - Arguments to update one LeadCadenceProgress.
     * @example
     * // Update one LeadCadenceProgress
     * const leadCadenceProgress = await prisma.leadCadenceProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadCadenceProgressUpdateArgs>(args: SelectSubset<T, LeadCadenceProgressUpdateArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadCadenceProgresses.
     * @param {LeadCadenceProgressDeleteManyArgs} args - Arguments to filter LeadCadenceProgresses to delete.
     * @example
     * // Delete a few LeadCadenceProgresses
     * const { count } = await prisma.leadCadenceProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadCadenceProgressDeleteManyArgs>(args?: SelectSubset<T, LeadCadenceProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadCadenceProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadCadenceProgresses
     * const leadCadenceProgress = await prisma.leadCadenceProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadCadenceProgressUpdateManyArgs>(args: SelectSubset<T, LeadCadenceProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadCadenceProgresses and returns the data updated in the database.
     * @param {LeadCadenceProgressUpdateManyAndReturnArgs} args - Arguments to update many LeadCadenceProgresses.
     * @example
     * // Update many LeadCadenceProgresses
     * const leadCadenceProgress = await prisma.leadCadenceProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadCadenceProgresses and only return the `id`
     * const leadCadenceProgressWithIdOnly = await prisma.leadCadenceProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadCadenceProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadCadenceProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadCadenceProgress.
     * @param {LeadCadenceProgressUpsertArgs} args - Arguments to update or create a LeadCadenceProgress.
     * @example
     * // Update or create a LeadCadenceProgress
     * const leadCadenceProgress = await prisma.leadCadenceProgress.upsert({
     *   create: {
     *     // ... data to create a LeadCadenceProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadCadenceProgress we want to update
     *   }
     * })
     */
    upsert<T extends LeadCadenceProgressUpsertArgs>(args: SelectSubset<T, LeadCadenceProgressUpsertArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadCadenceProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressCountArgs} args - Arguments to filter LeadCadenceProgresses to count.
     * @example
     * // Count the number of LeadCadenceProgresses
     * const count = await prisma.leadCadenceProgress.count({
     *   where: {
     *     // ... the filter for the LeadCadenceProgresses we want to count
     *   }
     * })
    **/
    count<T extends LeadCadenceProgressCountArgs>(
      args?: Subset<T, LeadCadenceProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCadenceProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadCadenceProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadCadenceProgressAggregateArgs>(args: Subset<T, LeadCadenceProgressAggregateArgs>): Prisma.PrismaPromise<GetLeadCadenceProgressAggregateType<T>>

    /**
     * Group by LeadCadenceProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadCadenceProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadCadenceProgressGroupByArgs['orderBy'] }
        : { orderBy?: LeadCadenceProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadCadenceProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadCadenceProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadCadenceProgress model
   */
  readonly fields: LeadCadenceProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadCadenceProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadCadenceProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cadence<T extends CadenceEngineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CadenceEngineDefaultArgs<ExtArgs>>): Prisma__CadenceEngineClient<$Result.GetResult<Prisma.$CadenceEnginePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    events<T extends LeadCadenceProgress$eventsArgs<ExtArgs> = {}>(args?: Subset<T, LeadCadenceProgress$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadCadenceProgress model
   */
  interface LeadCadenceProgressFieldRefs {
    readonly id: FieldRef<"LeadCadenceProgress", 'String'>
    readonly profileId: FieldRef<"LeadCadenceProgress", 'String'>
    readonly leadId: FieldRef<"LeadCadenceProgress", 'String'>
    readonly cadenceId: FieldRef<"LeadCadenceProgress", 'String'>
    readonly currentStageOrder: FieldRef<"LeadCadenceProgress", 'Int'>
    readonly nextStageOrder: FieldRef<"LeadCadenceProgress", 'Int'>
    readonly status: FieldRef<"LeadCadenceProgress", 'CadenceStatus'>
    readonly pausedAt: FieldRef<"LeadCadenceProgress", 'DateTime'>
    readonly finishedAt: FieldRef<"LeadCadenceProgress", 'DateTime'>
    readonly exitReason: FieldRef<"LeadCadenceProgress", 'String'>
    readonly nextScheduledAt: FieldRef<"LeadCadenceProgress", 'DateTime'>
    readonly lastActionAt: FieldRef<"LeadCadenceProgress", 'DateTime'>
    readonly version: FieldRef<"LeadCadenceProgress", 'Int'>
    readonly lockedAt: FieldRef<"LeadCadenceProgress", 'DateTime'>
    readonly lockedBy: FieldRef<"LeadCadenceProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LeadCadenceProgress findUnique
   */
  export type LeadCadenceProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceProgress to fetch.
     */
    where: LeadCadenceProgressWhereUniqueInput
  }

  /**
   * LeadCadenceProgress findUniqueOrThrow
   */
  export type LeadCadenceProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceProgress to fetch.
     */
    where: LeadCadenceProgressWhereUniqueInput
  }

  /**
   * LeadCadenceProgress findFirst
   */
  export type LeadCadenceProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceProgress to fetch.
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceProgresses to fetch.
     */
    orderBy?: LeadCadenceProgressOrderByWithRelationInput | LeadCadenceProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadCadenceProgresses.
     */
    cursor?: LeadCadenceProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadCadenceProgresses.
     */
    distinct?: LeadCadenceProgressScalarFieldEnum | LeadCadenceProgressScalarFieldEnum[]
  }

  /**
   * LeadCadenceProgress findFirstOrThrow
   */
  export type LeadCadenceProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceProgress to fetch.
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceProgresses to fetch.
     */
    orderBy?: LeadCadenceProgressOrderByWithRelationInput | LeadCadenceProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadCadenceProgresses.
     */
    cursor?: LeadCadenceProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadCadenceProgresses.
     */
    distinct?: LeadCadenceProgressScalarFieldEnum | LeadCadenceProgressScalarFieldEnum[]
  }

  /**
   * LeadCadenceProgress findMany
   */
  export type LeadCadenceProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceProgresses to fetch.
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceProgresses to fetch.
     */
    orderBy?: LeadCadenceProgressOrderByWithRelationInput | LeadCadenceProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadCadenceProgresses.
     */
    cursor?: LeadCadenceProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadCadenceProgresses.
     */
    distinct?: LeadCadenceProgressScalarFieldEnum | LeadCadenceProgressScalarFieldEnum[]
  }

  /**
   * LeadCadenceProgress create
   */
  export type LeadCadenceProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadCadenceProgress.
     */
    data: XOR<LeadCadenceProgressCreateInput, LeadCadenceProgressUncheckedCreateInput>
  }

  /**
   * LeadCadenceProgress createMany
   */
  export type LeadCadenceProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadCadenceProgresses.
     */
    data: LeadCadenceProgressCreateManyInput | LeadCadenceProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadCadenceProgress createManyAndReturn
   */
  export type LeadCadenceProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * The data used to create many LeadCadenceProgresses.
     */
    data: LeadCadenceProgressCreateManyInput | LeadCadenceProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadCadenceProgress update
   */
  export type LeadCadenceProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadCadenceProgress.
     */
    data: XOR<LeadCadenceProgressUpdateInput, LeadCadenceProgressUncheckedUpdateInput>
    /**
     * Choose, which LeadCadenceProgress to update.
     */
    where: LeadCadenceProgressWhereUniqueInput
  }

  /**
   * LeadCadenceProgress updateMany
   */
  export type LeadCadenceProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadCadenceProgresses.
     */
    data: XOR<LeadCadenceProgressUpdateManyMutationInput, LeadCadenceProgressUncheckedUpdateManyInput>
    /**
     * Filter which LeadCadenceProgresses to update
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * Limit how many LeadCadenceProgresses to update.
     */
    limit?: number
  }

  /**
   * LeadCadenceProgress updateManyAndReturn
   */
  export type LeadCadenceProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * The data used to update LeadCadenceProgresses.
     */
    data: XOR<LeadCadenceProgressUpdateManyMutationInput, LeadCadenceProgressUncheckedUpdateManyInput>
    /**
     * Filter which LeadCadenceProgresses to update
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * Limit how many LeadCadenceProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadCadenceProgress upsert
   */
  export type LeadCadenceProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadCadenceProgress to update in case it exists.
     */
    where: LeadCadenceProgressWhereUniqueInput
    /**
     * In case the LeadCadenceProgress found by the `where` argument doesn't exist, create a new LeadCadenceProgress with this data.
     */
    create: XOR<LeadCadenceProgressCreateInput, LeadCadenceProgressUncheckedCreateInput>
    /**
     * In case the LeadCadenceProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadCadenceProgressUpdateInput, LeadCadenceProgressUncheckedUpdateInput>
  }

  /**
   * LeadCadenceProgress delete
   */
  export type LeadCadenceProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
    /**
     * Filter which LeadCadenceProgress to delete.
     */
    where: LeadCadenceProgressWhereUniqueInput
  }

  /**
   * LeadCadenceProgress deleteMany
   */
  export type LeadCadenceProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadCadenceProgresses to delete
     */
    where?: LeadCadenceProgressWhereInput
    /**
     * Limit how many LeadCadenceProgresses to delete.
     */
    limit?: number
  }

  /**
   * LeadCadenceProgress.events
   */
  export type LeadCadenceProgress$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    where?: LeadCadenceEventWhereInput
    orderBy?: LeadCadenceEventOrderByWithRelationInput | LeadCadenceEventOrderByWithRelationInput[]
    cursor?: LeadCadenceEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadCadenceEventScalarFieldEnum | LeadCadenceEventScalarFieldEnum[]
  }

  /**
   * LeadCadenceProgress without action
   */
  export type LeadCadenceProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceProgress
     */
    select?: LeadCadenceProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceProgress
     */
    omit?: LeadCadenceProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceProgressInclude<ExtArgs> | null
  }


  /**
   * Model LeadCadenceEvent
   */

  export type AggregateLeadCadenceEvent = {
    _count: LeadCadenceEventCountAggregateOutputType | null
    _avg: LeadCadenceEventAvgAggregateOutputType | null
    _sum: LeadCadenceEventSumAggregateOutputType | null
    _min: LeadCadenceEventMinAggregateOutputType | null
    _max: LeadCadenceEventMaxAggregateOutputType | null
  }

  export type LeadCadenceEventAvgAggregateOutputType = {
    fromStage: number | null
    toStage: number | null
  }

  export type LeadCadenceEventSumAggregateOutputType = {
    fromStage: number | null
    toStage: number | null
  }

  export type LeadCadenceEventMinAggregateOutputType = {
    id: string | null
    leadCadenceProgressId: string | null
    leadId: string | null
    action: string | null
    fromStage: number | null
    toStage: number | null
    operatorId: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type LeadCadenceEventMaxAggregateOutputType = {
    id: string | null
    leadCadenceProgressId: string | null
    leadId: string | null
    action: string | null
    fromStage: number | null
    toStage: number | null
    operatorId: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type LeadCadenceEventCountAggregateOutputType = {
    id: number
    leadCadenceProgressId: number
    leadId: number
    action: number
    fromStage: number
    toStage: number
    operatorId: number
    notes: number
    createdAt: number
    _all: number
  }


  export type LeadCadenceEventAvgAggregateInputType = {
    fromStage?: true
    toStage?: true
  }

  export type LeadCadenceEventSumAggregateInputType = {
    fromStage?: true
    toStage?: true
  }

  export type LeadCadenceEventMinAggregateInputType = {
    id?: true
    leadCadenceProgressId?: true
    leadId?: true
    action?: true
    fromStage?: true
    toStage?: true
    operatorId?: true
    notes?: true
    createdAt?: true
  }

  export type LeadCadenceEventMaxAggregateInputType = {
    id?: true
    leadCadenceProgressId?: true
    leadId?: true
    action?: true
    fromStage?: true
    toStage?: true
    operatorId?: true
    notes?: true
    createdAt?: true
  }

  export type LeadCadenceEventCountAggregateInputType = {
    id?: true
    leadCadenceProgressId?: true
    leadId?: true
    action?: true
    fromStage?: true
    toStage?: true
    operatorId?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type LeadCadenceEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadCadenceEvent to aggregate.
     */
    where?: LeadCadenceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceEvents to fetch.
     */
    orderBy?: LeadCadenceEventOrderByWithRelationInput | LeadCadenceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadCadenceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadCadenceEvents
    **/
    _count?: true | LeadCadenceEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadCadenceEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadCadenceEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadCadenceEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadCadenceEventMaxAggregateInputType
  }

  export type GetLeadCadenceEventAggregateType<T extends LeadCadenceEventAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadCadenceEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadCadenceEvent[P]>
      : GetScalarType<T[P], AggregateLeadCadenceEvent[P]>
  }




  export type LeadCadenceEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadCadenceEventWhereInput
    orderBy?: LeadCadenceEventOrderByWithAggregationInput | LeadCadenceEventOrderByWithAggregationInput[]
    by: LeadCadenceEventScalarFieldEnum[] | LeadCadenceEventScalarFieldEnum
    having?: LeadCadenceEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCadenceEventCountAggregateInputType | true
    _avg?: LeadCadenceEventAvgAggregateInputType
    _sum?: LeadCadenceEventSumAggregateInputType
    _min?: LeadCadenceEventMinAggregateInputType
    _max?: LeadCadenceEventMaxAggregateInputType
  }

  export type LeadCadenceEventGroupByOutputType = {
    id: string
    leadCadenceProgressId: string
    leadId: string
    action: string
    fromStage: number | null
    toStage: number | null
    operatorId: string | null
    notes: string | null
    createdAt: Date
    _count: LeadCadenceEventCountAggregateOutputType | null
    _avg: LeadCadenceEventAvgAggregateOutputType | null
    _sum: LeadCadenceEventSumAggregateOutputType | null
    _min: LeadCadenceEventMinAggregateOutputType | null
    _max: LeadCadenceEventMaxAggregateOutputType | null
  }

  type GetLeadCadenceEventGroupByPayload<T extends LeadCadenceEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadCadenceEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadCadenceEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadCadenceEventGroupByOutputType[P]>
            : GetScalarType<T[P], LeadCadenceEventGroupByOutputType[P]>
        }
      >
    >


  export type LeadCadenceEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadCadenceProgressId?: boolean
    leadId?: boolean
    action?: boolean
    fromStage?: boolean
    toStage?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    progression?: boolean | LeadCadenceProgressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadCadenceEvent"]>

  export type LeadCadenceEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadCadenceProgressId?: boolean
    leadId?: boolean
    action?: boolean
    fromStage?: boolean
    toStage?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    progression?: boolean | LeadCadenceProgressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadCadenceEvent"]>

  export type LeadCadenceEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadCadenceProgressId?: boolean
    leadId?: boolean
    action?: boolean
    fromStage?: boolean
    toStage?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
    progression?: boolean | LeadCadenceProgressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadCadenceEvent"]>

  export type LeadCadenceEventSelectScalar = {
    id?: boolean
    leadCadenceProgressId?: boolean
    leadId?: boolean
    action?: boolean
    fromStage?: boolean
    toStage?: boolean
    operatorId?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type LeadCadenceEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadCadenceProgressId" | "leadId" | "action" | "fromStage" | "toStage" | "operatorId" | "notes" | "createdAt", ExtArgs["result"]["leadCadenceEvent"]>
  export type LeadCadenceEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progression?: boolean | LeadCadenceProgressDefaultArgs<ExtArgs>
  }
  export type LeadCadenceEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progression?: boolean | LeadCadenceProgressDefaultArgs<ExtArgs>
  }
  export type LeadCadenceEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    progression?: boolean | LeadCadenceProgressDefaultArgs<ExtArgs>
  }

  export type $LeadCadenceEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadCadenceEvent"
    objects: {
      progression: Prisma.$LeadCadenceProgressPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadCadenceProgressId: string
      leadId: string
      action: string
      fromStage: number | null
      toStage: number | null
      operatorId: string | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["leadCadenceEvent"]>
    composites: {}
  }

  type LeadCadenceEventGetPayload<S extends boolean | null | undefined | LeadCadenceEventDefaultArgs> = $Result.GetResult<Prisma.$LeadCadenceEventPayload, S>

  type LeadCadenceEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadCadenceEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCadenceEventCountAggregateInputType | true
    }

  export interface LeadCadenceEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadCadenceEvent'], meta: { name: 'LeadCadenceEvent' } }
    /**
     * Find zero or one LeadCadenceEvent that matches the filter.
     * @param {LeadCadenceEventFindUniqueArgs} args - Arguments to find a LeadCadenceEvent
     * @example
     * // Get one LeadCadenceEvent
     * const leadCadenceEvent = await prisma.leadCadenceEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadCadenceEventFindUniqueArgs>(args: SelectSubset<T, LeadCadenceEventFindUniqueArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadCadenceEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadCadenceEventFindUniqueOrThrowArgs} args - Arguments to find a LeadCadenceEvent
     * @example
     * // Get one LeadCadenceEvent
     * const leadCadenceEvent = await prisma.leadCadenceEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadCadenceEventFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadCadenceEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadCadenceEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventFindFirstArgs} args - Arguments to find a LeadCadenceEvent
     * @example
     * // Get one LeadCadenceEvent
     * const leadCadenceEvent = await prisma.leadCadenceEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadCadenceEventFindFirstArgs>(args?: SelectSubset<T, LeadCadenceEventFindFirstArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadCadenceEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventFindFirstOrThrowArgs} args - Arguments to find a LeadCadenceEvent
     * @example
     * // Get one LeadCadenceEvent
     * const leadCadenceEvent = await prisma.leadCadenceEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadCadenceEventFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadCadenceEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadCadenceEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadCadenceEvents
     * const leadCadenceEvents = await prisma.leadCadenceEvent.findMany()
     * 
     * // Get first 10 LeadCadenceEvents
     * const leadCadenceEvents = await prisma.leadCadenceEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadCadenceEventWithIdOnly = await prisma.leadCadenceEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadCadenceEventFindManyArgs>(args?: SelectSubset<T, LeadCadenceEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadCadenceEvent.
     * @param {LeadCadenceEventCreateArgs} args - Arguments to create a LeadCadenceEvent.
     * @example
     * // Create one LeadCadenceEvent
     * const LeadCadenceEvent = await prisma.leadCadenceEvent.create({
     *   data: {
     *     // ... data to create a LeadCadenceEvent
     *   }
     * })
     * 
     */
    create<T extends LeadCadenceEventCreateArgs>(args: SelectSubset<T, LeadCadenceEventCreateArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadCadenceEvents.
     * @param {LeadCadenceEventCreateManyArgs} args - Arguments to create many LeadCadenceEvents.
     * @example
     * // Create many LeadCadenceEvents
     * const leadCadenceEvent = await prisma.leadCadenceEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCadenceEventCreateManyArgs>(args?: SelectSubset<T, LeadCadenceEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadCadenceEvents and returns the data saved in the database.
     * @param {LeadCadenceEventCreateManyAndReturnArgs} args - Arguments to create many LeadCadenceEvents.
     * @example
     * // Create many LeadCadenceEvents
     * const leadCadenceEvent = await prisma.leadCadenceEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadCadenceEvents and only return the `id`
     * const leadCadenceEventWithIdOnly = await prisma.leadCadenceEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCadenceEventCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCadenceEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadCadenceEvent.
     * @param {LeadCadenceEventDeleteArgs} args - Arguments to delete one LeadCadenceEvent.
     * @example
     * // Delete one LeadCadenceEvent
     * const LeadCadenceEvent = await prisma.leadCadenceEvent.delete({
     *   where: {
     *     // ... filter to delete one LeadCadenceEvent
     *   }
     * })
     * 
     */
    delete<T extends LeadCadenceEventDeleteArgs>(args: SelectSubset<T, LeadCadenceEventDeleteArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadCadenceEvent.
     * @param {LeadCadenceEventUpdateArgs} args - Arguments to update one LeadCadenceEvent.
     * @example
     * // Update one LeadCadenceEvent
     * const leadCadenceEvent = await prisma.leadCadenceEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadCadenceEventUpdateArgs>(args: SelectSubset<T, LeadCadenceEventUpdateArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadCadenceEvents.
     * @param {LeadCadenceEventDeleteManyArgs} args - Arguments to filter LeadCadenceEvents to delete.
     * @example
     * // Delete a few LeadCadenceEvents
     * const { count } = await prisma.leadCadenceEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadCadenceEventDeleteManyArgs>(args?: SelectSubset<T, LeadCadenceEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadCadenceEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadCadenceEvents
     * const leadCadenceEvent = await prisma.leadCadenceEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadCadenceEventUpdateManyArgs>(args: SelectSubset<T, LeadCadenceEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadCadenceEvents and returns the data updated in the database.
     * @param {LeadCadenceEventUpdateManyAndReturnArgs} args - Arguments to update many LeadCadenceEvents.
     * @example
     * // Update many LeadCadenceEvents
     * const leadCadenceEvent = await prisma.leadCadenceEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadCadenceEvents and only return the `id`
     * const leadCadenceEventWithIdOnly = await prisma.leadCadenceEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadCadenceEventUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadCadenceEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadCadenceEvent.
     * @param {LeadCadenceEventUpsertArgs} args - Arguments to update or create a LeadCadenceEvent.
     * @example
     * // Update or create a LeadCadenceEvent
     * const leadCadenceEvent = await prisma.leadCadenceEvent.upsert({
     *   create: {
     *     // ... data to create a LeadCadenceEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadCadenceEvent we want to update
     *   }
     * })
     */
    upsert<T extends LeadCadenceEventUpsertArgs>(args: SelectSubset<T, LeadCadenceEventUpsertArgs<ExtArgs>>): Prisma__LeadCadenceEventClient<$Result.GetResult<Prisma.$LeadCadenceEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadCadenceEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventCountArgs} args - Arguments to filter LeadCadenceEvents to count.
     * @example
     * // Count the number of LeadCadenceEvents
     * const count = await prisma.leadCadenceEvent.count({
     *   where: {
     *     // ... the filter for the LeadCadenceEvents we want to count
     *   }
     * })
    **/
    count<T extends LeadCadenceEventCountArgs>(
      args?: Subset<T, LeadCadenceEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCadenceEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadCadenceEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadCadenceEventAggregateArgs>(args: Subset<T, LeadCadenceEventAggregateArgs>): Prisma.PrismaPromise<GetLeadCadenceEventAggregateType<T>>

    /**
     * Group by LeadCadenceEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCadenceEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadCadenceEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadCadenceEventGroupByArgs['orderBy'] }
        : { orderBy?: LeadCadenceEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadCadenceEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadCadenceEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadCadenceEvent model
   */
  readonly fields: LeadCadenceEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadCadenceEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadCadenceEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    progression<T extends LeadCadenceProgressDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadCadenceProgressDefaultArgs<ExtArgs>>): Prisma__LeadCadenceProgressClient<$Result.GetResult<Prisma.$LeadCadenceProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadCadenceEvent model
   */
  interface LeadCadenceEventFieldRefs {
    readonly id: FieldRef<"LeadCadenceEvent", 'String'>
    readonly leadCadenceProgressId: FieldRef<"LeadCadenceEvent", 'String'>
    readonly leadId: FieldRef<"LeadCadenceEvent", 'String'>
    readonly action: FieldRef<"LeadCadenceEvent", 'String'>
    readonly fromStage: FieldRef<"LeadCadenceEvent", 'Int'>
    readonly toStage: FieldRef<"LeadCadenceEvent", 'Int'>
    readonly operatorId: FieldRef<"LeadCadenceEvent", 'String'>
    readonly notes: FieldRef<"LeadCadenceEvent", 'String'>
    readonly createdAt: FieldRef<"LeadCadenceEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeadCadenceEvent findUnique
   */
  export type LeadCadenceEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceEvent to fetch.
     */
    where: LeadCadenceEventWhereUniqueInput
  }

  /**
   * LeadCadenceEvent findUniqueOrThrow
   */
  export type LeadCadenceEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceEvent to fetch.
     */
    where: LeadCadenceEventWhereUniqueInput
  }

  /**
   * LeadCadenceEvent findFirst
   */
  export type LeadCadenceEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceEvent to fetch.
     */
    where?: LeadCadenceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceEvents to fetch.
     */
    orderBy?: LeadCadenceEventOrderByWithRelationInput | LeadCadenceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadCadenceEvents.
     */
    cursor?: LeadCadenceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadCadenceEvents.
     */
    distinct?: LeadCadenceEventScalarFieldEnum | LeadCadenceEventScalarFieldEnum[]
  }

  /**
   * LeadCadenceEvent findFirstOrThrow
   */
  export type LeadCadenceEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceEvent to fetch.
     */
    where?: LeadCadenceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceEvents to fetch.
     */
    orderBy?: LeadCadenceEventOrderByWithRelationInput | LeadCadenceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadCadenceEvents.
     */
    cursor?: LeadCadenceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadCadenceEvents.
     */
    distinct?: LeadCadenceEventScalarFieldEnum | LeadCadenceEventScalarFieldEnum[]
  }

  /**
   * LeadCadenceEvent findMany
   */
  export type LeadCadenceEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadCadenceEvents to fetch.
     */
    where?: LeadCadenceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadCadenceEvents to fetch.
     */
    orderBy?: LeadCadenceEventOrderByWithRelationInput | LeadCadenceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadCadenceEvents.
     */
    cursor?: LeadCadenceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadCadenceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadCadenceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadCadenceEvents.
     */
    distinct?: LeadCadenceEventScalarFieldEnum | LeadCadenceEventScalarFieldEnum[]
  }

  /**
   * LeadCadenceEvent create
   */
  export type LeadCadenceEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadCadenceEvent.
     */
    data: XOR<LeadCadenceEventCreateInput, LeadCadenceEventUncheckedCreateInput>
  }

  /**
   * LeadCadenceEvent createMany
   */
  export type LeadCadenceEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadCadenceEvents.
     */
    data: LeadCadenceEventCreateManyInput | LeadCadenceEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadCadenceEvent createManyAndReturn
   */
  export type LeadCadenceEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * The data used to create many LeadCadenceEvents.
     */
    data: LeadCadenceEventCreateManyInput | LeadCadenceEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadCadenceEvent update
   */
  export type LeadCadenceEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadCadenceEvent.
     */
    data: XOR<LeadCadenceEventUpdateInput, LeadCadenceEventUncheckedUpdateInput>
    /**
     * Choose, which LeadCadenceEvent to update.
     */
    where: LeadCadenceEventWhereUniqueInput
  }

  /**
   * LeadCadenceEvent updateMany
   */
  export type LeadCadenceEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadCadenceEvents.
     */
    data: XOR<LeadCadenceEventUpdateManyMutationInput, LeadCadenceEventUncheckedUpdateManyInput>
    /**
     * Filter which LeadCadenceEvents to update
     */
    where?: LeadCadenceEventWhereInput
    /**
     * Limit how many LeadCadenceEvents to update.
     */
    limit?: number
  }

  /**
   * LeadCadenceEvent updateManyAndReturn
   */
  export type LeadCadenceEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * The data used to update LeadCadenceEvents.
     */
    data: XOR<LeadCadenceEventUpdateManyMutationInput, LeadCadenceEventUncheckedUpdateManyInput>
    /**
     * Filter which LeadCadenceEvents to update
     */
    where?: LeadCadenceEventWhereInput
    /**
     * Limit how many LeadCadenceEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadCadenceEvent upsert
   */
  export type LeadCadenceEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadCadenceEvent to update in case it exists.
     */
    where: LeadCadenceEventWhereUniqueInput
    /**
     * In case the LeadCadenceEvent found by the `where` argument doesn't exist, create a new LeadCadenceEvent with this data.
     */
    create: XOR<LeadCadenceEventCreateInput, LeadCadenceEventUncheckedCreateInput>
    /**
     * In case the LeadCadenceEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadCadenceEventUpdateInput, LeadCadenceEventUncheckedUpdateInput>
  }

  /**
   * LeadCadenceEvent delete
   */
  export type LeadCadenceEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
    /**
     * Filter which LeadCadenceEvent to delete.
     */
    where: LeadCadenceEventWhereUniqueInput
  }

  /**
   * LeadCadenceEvent deleteMany
   */
  export type LeadCadenceEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadCadenceEvents to delete
     */
    where?: LeadCadenceEventWhereInput
    /**
     * Limit how many LeadCadenceEvents to delete.
     */
    limit?: number
  }

  /**
   * LeadCadenceEvent without action
   */
  export type LeadCadenceEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCadenceEvent
     */
    select?: LeadCadenceEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadCadenceEvent
     */
    omit?: LeadCadenceEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadCadenceEventInclude<ExtArgs> | null
  }


  /**
   * Model Template
   */

  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    channel: $Enums.TemplateChannel | null
    subject: string | null
    body: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    channel: $Enums.TemplateChannel | null
    subject: string | null
    body: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    profileId: number
    name: number
    channel: number
    subject: number
    body: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TemplateMinAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    channel?: true
    subject?: true
    body?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    channel?: true
    subject?: true
    body?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    channel?: true
    subject?: true
    body?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: TemplateOrderByWithAggregationInput | TemplateOrderByWithAggregationInput[]
    by: TemplateScalarFieldEnum[] | TemplateScalarFieldEnum
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }

  export type TemplateGroupByOutputType = {
    id: string
    profileId: string
    name: string
    channel: $Enums.TemplateChannel
    subject: string | null
    body: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TemplateCountAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    channel?: boolean
    subject?: boolean
    body?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    cadenceStages?: boolean | Template$cadenceStagesArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    channel?: boolean
    subject?: boolean
    body?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    channel?: boolean
    subject?: boolean
    body?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectScalar = {
    id?: boolean
    profileId?: boolean
    name?: boolean
    channel?: boolean
    subject?: boolean
    body?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "name" | "channel" | "subject" | "body" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["template"]>
  export type TemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    cadenceStages?: boolean | Template$cadenceStagesArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type TemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $TemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Template"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      cadenceStages: Prisma.$CadenceStagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      name: string
      channel: $Enums.TemplateChannel
      subject: string | null
      body: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["template"]>
    composites: {}
  }

  type TemplateGetPayload<S extends boolean | null | undefined | TemplateDefaultArgs> = $Result.GetResult<Prisma.$TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateFindUniqueArgs>(args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Template that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateFindFirstArgs>(args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Template that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateFindManyArgs>(args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
     */
    create<T extends TemplateCreateArgs>(args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Templates.
     * @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateCreateManyArgs>(args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Templates and returns the data saved in the database.
     * @param {TemplateCreateManyAndReturnArgs} args - Arguments to create many Templates.
     * @example
     * // Create many Templates
     * const template = await prisma.template.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
     */
    delete<T extends TemplateDeleteArgs>(args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateUpdateArgs>(args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateDeleteManyArgs>(args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateUpdateManyArgs>(args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates and returns the data updated in the database.
     * @param {TemplateUpdateManyAndReturnArgs} args - Arguments to update many Templates.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Templates and only return the `id`
     * const templateWithIdOnly = await prisma.template.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
     */
    upsert<T extends TemplateUpsertArgs>(args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>): Prisma__TemplateClient<$Result.GetResult<Prisma.$TemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Template model
   */
  readonly fields: TemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cadenceStages<T extends Template$cadenceStagesArgs<ExtArgs> = {}>(args?: Subset<T, Template$cadenceStagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CadenceStagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Template model
   */
  interface TemplateFieldRefs {
    readonly id: FieldRef<"Template", 'String'>
    readonly profileId: FieldRef<"Template", 'String'>
    readonly name: FieldRef<"Template", 'String'>
    readonly channel: FieldRef<"Template", 'TemplateChannel'>
    readonly subject: FieldRef<"Template", 'String'>
    readonly body: FieldRef<"Template", 'String'>
    readonly isActive: FieldRef<"Template", 'Boolean'>
    readonly createdAt: FieldRef<"Template", 'DateTime'>
    readonly updatedAt: FieldRef<"Template", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Template findUnique
   */
  export type TemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findFirst
   */
  export type TemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: TemplateOrderByWithRelationInput | TemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: TemplateScalarFieldEnum | TemplateScalarFieldEnum[]
  }

  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }

  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Template createManyAndReturn
   */
  export type TemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to create many Templates.
     */
    data: TemplateCreateManyInput | TemplateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
  }

  /**
   * Template updateManyAndReturn
   */
  export type TemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }

  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
    /**
     * Limit how many Templates to delete.
     */
    limit?: number
  }

  /**
   * Template.cadenceStages
   */
  export type Template$cadenceStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CadenceStage
     */
    select?: CadenceStageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CadenceStage
     */
    omit?: CadenceStageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CadenceStageInclude<ExtArgs> | null
    where?: CadenceStageWhereInput
    orderBy?: CadenceStageOrderByWithRelationInput | CadenceStageOrderByWithRelationInput[]
    cursor?: CadenceStageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CadenceStageScalarFieldEnum | CadenceStageScalarFieldEnum[]
  }

  /**
   * Template without action
   */
  export type TemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Template
     */
    omit?: TemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateInclude<ExtArgs> | null
  }


  /**
   * Model LeadHistory
   */

  export type AggregateLeadHistory = {
    _count: LeadHistoryCountAggregateOutputType | null
    _min: LeadHistoryMinAggregateOutputType | null
    _max: LeadHistoryMaxAggregateOutputType | null
  }

  export type LeadHistoryMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    actionBy: string | null
    createdAt: Date | null
  }

  export type LeadHistoryMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    actionBy: string | null
    createdAt: Date | null
  }

  export type LeadHistoryCountAggregateOutputType = {
    id: number
    leadId: number
    previousData: number
    newData: number
    actionBy: number
    createdAt: number
    _all: number
  }


  export type LeadHistoryMinAggregateInputType = {
    id?: true
    leadId?: true
    actionBy?: true
    createdAt?: true
  }

  export type LeadHistoryMaxAggregateInputType = {
    id?: true
    leadId?: true
    actionBy?: true
    createdAt?: true
  }

  export type LeadHistoryCountAggregateInputType = {
    id?: true
    leadId?: true
    previousData?: true
    newData?: true
    actionBy?: true
    createdAt?: true
    _all?: true
  }

  export type LeadHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadHistory to aggregate.
     */
    where?: LeadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadHistories to fetch.
     */
    orderBy?: LeadHistoryOrderByWithRelationInput | LeadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadHistories
    **/
    _count?: true | LeadHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadHistoryMaxAggregateInputType
  }

  export type GetLeadHistoryAggregateType<T extends LeadHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadHistory[P]>
      : GetScalarType<T[P], AggregateLeadHistory[P]>
  }




  export type LeadHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadHistoryWhereInput
    orderBy?: LeadHistoryOrderByWithAggregationInput | LeadHistoryOrderByWithAggregationInput[]
    by: LeadHistoryScalarFieldEnum[] | LeadHistoryScalarFieldEnum
    having?: LeadHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadHistoryCountAggregateInputType | true
    _min?: LeadHistoryMinAggregateInputType
    _max?: LeadHistoryMaxAggregateInputType
  }

  export type LeadHistoryGroupByOutputType = {
    id: string
    leadId: string
    previousData: JsonValue
    newData: JsonValue
    actionBy: string | null
    createdAt: Date
    _count: LeadHistoryCountAggregateOutputType | null
    _min: LeadHistoryMinAggregateOutputType | null
    _max: LeadHistoryMaxAggregateOutputType | null
  }

  type GetLeadHistoryGroupByPayload<T extends LeadHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], LeadHistoryGroupByOutputType[P]>
        }
      >
    >


  export type LeadHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    previousData?: boolean
    newData?: boolean
    actionBy?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadHistory"]>

  export type LeadHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    previousData?: boolean
    newData?: boolean
    actionBy?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadHistory"]>

  export type LeadHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    previousData?: boolean
    newData?: boolean
    actionBy?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadHistory"]>

  export type LeadHistorySelectScalar = {
    id?: boolean
    leadId?: boolean
    previousData?: boolean
    newData?: boolean
    actionBy?: boolean
    createdAt?: boolean
  }

  export type LeadHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "previousData" | "newData" | "actionBy" | "createdAt", ExtArgs["result"]["leadHistory"]>
  export type LeadHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type LeadHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type LeadHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $LeadHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadHistory"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      previousData: Prisma.JsonValue
      newData: Prisma.JsonValue
      actionBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["leadHistory"]>
    composites: {}
  }

  type LeadHistoryGetPayload<S extends boolean | null | undefined | LeadHistoryDefaultArgs> = $Result.GetResult<Prisma.$LeadHistoryPayload, S>

  type LeadHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadHistoryCountAggregateInputType | true
    }

  export interface LeadHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadHistory'], meta: { name: 'LeadHistory' } }
    /**
     * Find zero or one LeadHistory that matches the filter.
     * @param {LeadHistoryFindUniqueArgs} args - Arguments to find a LeadHistory
     * @example
     * // Get one LeadHistory
     * const leadHistory = await prisma.leadHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadHistoryFindUniqueArgs>(args: SelectSubset<T, LeadHistoryFindUniqueArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadHistoryFindUniqueOrThrowArgs} args - Arguments to find a LeadHistory
     * @example
     * // Get one LeadHistory
     * const leadHistory = await prisma.leadHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryFindFirstArgs} args - Arguments to find a LeadHistory
     * @example
     * // Get one LeadHistory
     * const leadHistory = await prisma.leadHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadHistoryFindFirstArgs>(args?: SelectSubset<T, LeadHistoryFindFirstArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryFindFirstOrThrowArgs} args - Arguments to find a LeadHistory
     * @example
     * // Get one LeadHistory
     * const leadHistory = await prisma.leadHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadHistories
     * const leadHistories = await prisma.leadHistory.findMany()
     * 
     * // Get first 10 LeadHistories
     * const leadHistories = await prisma.leadHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadHistoryWithIdOnly = await prisma.leadHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadHistoryFindManyArgs>(args?: SelectSubset<T, LeadHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadHistory.
     * @param {LeadHistoryCreateArgs} args - Arguments to create a LeadHistory.
     * @example
     * // Create one LeadHistory
     * const LeadHistory = await prisma.leadHistory.create({
     *   data: {
     *     // ... data to create a LeadHistory
     *   }
     * })
     * 
     */
    create<T extends LeadHistoryCreateArgs>(args: SelectSubset<T, LeadHistoryCreateArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadHistories.
     * @param {LeadHistoryCreateManyArgs} args - Arguments to create many LeadHistories.
     * @example
     * // Create many LeadHistories
     * const leadHistory = await prisma.leadHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadHistoryCreateManyArgs>(args?: SelectSubset<T, LeadHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadHistories and returns the data saved in the database.
     * @param {LeadHistoryCreateManyAndReturnArgs} args - Arguments to create many LeadHistories.
     * @example
     * // Create many LeadHistories
     * const leadHistory = await prisma.leadHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadHistories and only return the `id`
     * const leadHistoryWithIdOnly = await prisma.leadHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadHistory.
     * @param {LeadHistoryDeleteArgs} args - Arguments to delete one LeadHistory.
     * @example
     * // Delete one LeadHistory
     * const LeadHistory = await prisma.leadHistory.delete({
     *   where: {
     *     // ... filter to delete one LeadHistory
     *   }
     * })
     * 
     */
    delete<T extends LeadHistoryDeleteArgs>(args: SelectSubset<T, LeadHistoryDeleteArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadHistory.
     * @param {LeadHistoryUpdateArgs} args - Arguments to update one LeadHistory.
     * @example
     * // Update one LeadHistory
     * const leadHistory = await prisma.leadHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadHistoryUpdateArgs>(args: SelectSubset<T, LeadHistoryUpdateArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadHistories.
     * @param {LeadHistoryDeleteManyArgs} args - Arguments to filter LeadHistories to delete.
     * @example
     * // Delete a few LeadHistories
     * const { count } = await prisma.leadHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadHistoryDeleteManyArgs>(args?: SelectSubset<T, LeadHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadHistories
     * const leadHistory = await prisma.leadHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadHistoryUpdateManyArgs>(args: SelectSubset<T, LeadHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadHistories and returns the data updated in the database.
     * @param {LeadHistoryUpdateManyAndReturnArgs} args - Arguments to update many LeadHistories.
     * @example
     * // Update many LeadHistories
     * const leadHistory = await prisma.leadHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadHistories and only return the `id`
     * const leadHistoryWithIdOnly = await prisma.leadHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadHistory.
     * @param {LeadHistoryUpsertArgs} args - Arguments to update or create a LeadHistory.
     * @example
     * // Update or create a LeadHistory
     * const leadHistory = await prisma.leadHistory.upsert({
     *   create: {
     *     // ... data to create a LeadHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadHistory we want to update
     *   }
     * })
     */
    upsert<T extends LeadHistoryUpsertArgs>(args: SelectSubset<T, LeadHistoryUpsertArgs<ExtArgs>>): Prisma__LeadHistoryClient<$Result.GetResult<Prisma.$LeadHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryCountArgs} args - Arguments to filter LeadHistories to count.
     * @example
     * // Count the number of LeadHistories
     * const count = await prisma.leadHistory.count({
     *   where: {
     *     // ... the filter for the LeadHistories we want to count
     *   }
     * })
    **/
    count<T extends LeadHistoryCountArgs>(
      args?: Subset<T, LeadHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadHistoryAggregateArgs>(args: Subset<T, LeadHistoryAggregateArgs>): Prisma.PrismaPromise<GetLeadHistoryAggregateType<T>>

    /**
     * Group by LeadHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadHistoryGroupByArgs['orderBy'] }
        : { orderBy?: LeadHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadHistory model
   */
  readonly fields: LeadHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadHistory model
   */
  interface LeadHistoryFieldRefs {
    readonly id: FieldRef<"LeadHistory", 'String'>
    readonly leadId: FieldRef<"LeadHistory", 'String'>
    readonly previousData: FieldRef<"LeadHistory", 'Json'>
    readonly newData: FieldRef<"LeadHistory", 'Json'>
    readonly actionBy: FieldRef<"LeadHistory", 'String'>
    readonly createdAt: FieldRef<"LeadHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeadHistory findUnique
   */
  export type LeadHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which LeadHistory to fetch.
     */
    where: LeadHistoryWhereUniqueInput
  }

  /**
   * LeadHistory findUniqueOrThrow
   */
  export type LeadHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which LeadHistory to fetch.
     */
    where: LeadHistoryWhereUniqueInput
  }

  /**
   * LeadHistory findFirst
   */
  export type LeadHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which LeadHistory to fetch.
     */
    where?: LeadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadHistories to fetch.
     */
    orderBy?: LeadHistoryOrderByWithRelationInput | LeadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadHistories.
     */
    cursor?: LeadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadHistories.
     */
    distinct?: LeadHistoryScalarFieldEnum | LeadHistoryScalarFieldEnum[]
  }

  /**
   * LeadHistory findFirstOrThrow
   */
  export type LeadHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which LeadHistory to fetch.
     */
    where?: LeadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadHistories to fetch.
     */
    orderBy?: LeadHistoryOrderByWithRelationInput | LeadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadHistories.
     */
    cursor?: LeadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadHistories.
     */
    distinct?: LeadHistoryScalarFieldEnum | LeadHistoryScalarFieldEnum[]
  }

  /**
   * LeadHistory findMany
   */
  export type LeadHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which LeadHistories to fetch.
     */
    where?: LeadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadHistories to fetch.
     */
    orderBy?: LeadHistoryOrderByWithRelationInput | LeadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadHistories.
     */
    cursor?: LeadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadHistories.
     */
    distinct?: LeadHistoryScalarFieldEnum | LeadHistoryScalarFieldEnum[]
  }

  /**
   * LeadHistory create
   */
  export type LeadHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadHistory.
     */
    data: XOR<LeadHistoryCreateInput, LeadHistoryUncheckedCreateInput>
  }

  /**
   * LeadHistory createMany
   */
  export type LeadHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadHistories.
     */
    data: LeadHistoryCreateManyInput | LeadHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadHistory createManyAndReturn
   */
  export type LeadHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many LeadHistories.
     */
    data: LeadHistoryCreateManyInput | LeadHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadHistory update
   */
  export type LeadHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadHistory.
     */
    data: XOR<LeadHistoryUpdateInput, LeadHistoryUncheckedUpdateInput>
    /**
     * Choose, which LeadHistory to update.
     */
    where: LeadHistoryWhereUniqueInput
  }

  /**
   * LeadHistory updateMany
   */
  export type LeadHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadHistories.
     */
    data: XOR<LeadHistoryUpdateManyMutationInput, LeadHistoryUncheckedUpdateManyInput>
    /**
     * Filter which LeadHistories to update
     */
    where?: LeadHistoryWhereInput
    /**
     * Limit how many LeadHistories to update.
     */
    limit?: number
  }

  /**
   * LeadHistory updateManyAndReturn
   */
  export type LeadHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * The data used to update LeadHistories.
     */
    data: XOR<LeadHistoryUpdateManyMutationInput, LeadHistoryUncheckedUpdateManyInput>
    /**
     * Filter which LeadHistories to update
     */
    where?: LeadHistoryWhereInput
    /**
     * Limit how many LeadHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadHistory upsert
   */
  export type LeadHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadHistory to update in case it exists.
     */
    where: LeadHistoryWhereUniqueInput
    /**
     * In case the LeadHistory found by the `where` argument doesn't exist, create a new LeadHistory with this data.
     */
    create: XOR<LeadHistoryCreateInput, LeadHistoryUncheckedCreateInput>
    /**
     * In case the LeadHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadHistoryUpdateInput, LeadHistoryUncheckedUpdateInput>
  }

  /**
   * LeadHistory delete
   */
  export type LeadHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
    /**
     * Filter which LeadHistory to delete.
     */
    where: LeadHistoryWhereUniqueInput
  }

  /**
   * LeadHistory deleteMany
   */
  export type LeadHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadHistories to delete
     */
    where?: LeadHistoryWhereInput
    /**
     * Limit how many LeadHistories to delete.
     */
    limit?: number
  }

  /**
   * LeadHistory without action
   */
  export type LeadHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadHistory
     */
    select?: LeadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadHistory
     */
    omit?: LeadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Operator
   */

  export type AggregateOperator = {
    _count: OperatorCountAggregateOutputType | null
    _min: OperatorMinAggregateOutputType | null
    _max: OperatorMaxAggregateOutputType | null
  }

  export type OperatorMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OperatorMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    name: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OperatorCountAggregateOutputType = {
    id: number
    profileId: number
    name: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OperatorMinAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OperatorMaxAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OperatorCountAggregateInputType = {
    id?: true
    profileId?: true
    name?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OperatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operator to aggregate.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Operators
    **/
    _count?: true | OperatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OperatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OperatorMaxAggregateInputType
  }

  export type GetOperatorAggregateType<T extends OperatorAggregateArgs> = {
        [P in keyof T & keyof AggregateOperator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOperator[P]>
      : GetScalarType<T[P], AggregateOperator[P]>
  }




  export type OperatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OperatorWhereInput
    orderBy?: OperatorOrderByWithAggregationInput | OperatorOrderByWithAggregationInput[]
    by: OperatorScalarFieldEnum[] | OperatorScalarFieldEnum
    having?: OperatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OperatorCountAggregateInputType | true
    _min?: OperatorMinAggregateInputType
    _max?: OperatorMaxAggregateInputType
  }

  export type OperatorGroupByOutputType = {
    id: string
    profileId: string
    name: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: OperatorCountAggregateOutputType | null
    _min: OperatorMinAggregateOutputType | null
    _max: OperatorMaxAggregateOutputType | null
  }

  type GetOperatorGroupByPayload<T extends OperatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OperatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OperatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OperatorGroupByOutputType[P]>
            : GetScalarType<T[P], OperatorGroupByOutputType[P]>
        }
      >
    >


  export type OperatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    leads?: boolean | Operator$leadsArgs<ExtArgs>
    leadNotes?: boolean | Operator$leadNotesArgs<ExtArgs>
    _count?: boolean | OperatorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operator"]>

  export type OperatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operator"]>

  export type OperatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["operator"]>

  export type OperatorSelectScalar = {
    id?: boolean
    profileId?: boolean
    name?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OperatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "name" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["operator"]>
  export type OperatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    leads?: boolean | Operator$leadsArgs<ExtArgs>
    leadNotes?: boolean | Operator$leadNotesArgs<ExtArgs>
    _count?: boolean | OperatorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OperatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type OperatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $OperatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Operator"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      leads: Prisma.$LeadPayload<ExtArgs>[]
      leadNotes: Prisma.$LeadNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      name: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["operator"]>
    composites: {}
  }

  type OperatorGetPayload<S extends boolean | null | undefined | OperatorDefaultArgs> = $Result.GetResult<Prisma.$OperatorPayload, S>

  type OperatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OperatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OperatorCountAggregateInputType | true
    }

  export interface OperatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Operator'], meta: { name: 'Operator' } }
    /**
     * Find zero or one Operator that matches the filter.
     * @param {OperatorFindUniqueArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OperatorFindUniqueArgs>(args: SelectSubset<T, OperatorFindUniqueArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Operator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OperatorFindUniqueOrThrowArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OperatorFindUniqueOrThrowArgs>(args: SelectSubset<T, OperatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorFindFirstArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OperatorFindFirstArgs>(args?: SelectSubset<T, OperatorFindFirstArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Operator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorFindFirstOrThrowArgs} args - Arguments to find a Operator
     * @example
     * // Get one Operator
     * const operator = await prisma.operator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OperatorFindFirstOrThrowArgs>(args?: SelectSubset<T, OperatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Operators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Operators
     * const operators = await prisma.operator.findMany()
     * 
     * // Get first 10 Operators
     * const operators = await prisma.operator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const operatorWithIdOnly = await prisma.operator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OperatorFindManyArgs>(args?: SelectSubset<T, OperatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Operator.
     * @param {OperatorCreateArgs} args - Arguments to create a Operator.
     * @example
     * // Create one Operator
     * const Operator = await prisma.operator.create({
     *   data: {
     *     // ... data to create a Operator
     *   }
     * })
     * 
     */
    create<T extends OperatorCreateArgs>(args: SelectSubset<T, OperatorCreateArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Operators.
     * @param {OperatorCreateManyArgs} args - Arguments to create many Operators.
     * @example
     * // Create many Operators
     * const operator = await prisma.operator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OperatorCreateManyArgs>(args?: SelectSubset<T, OperatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Operators and returns the data saved in the database.
     * @param {OperatorCreateManyAndReturnArgs} args - Arguments to create many Operators.
     * @example
     * // Create many Operators
     * const operator = await prisma.operator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Operators and only return the `id`
     * const operatorWithIdOnly = await prisma.operator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OperatorCreateManyAndReturnArgs>(args?: SelectSubset<T, OperatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Operator.
     * @param {OperatorDeleteArgs} args - Arguments to delete one Operator.
     * @example
     * // Delete one Operator
     * const Operator = await prisma.operator.delete({
     *   where: {
     *     // ... filter to delete one Operator
     *   }
     * })
     * 
     */
    delete<T extends OperatorDeleteArgs>(args: SelectSubset<T, OperatorDeleteArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Operator.
     * @param {OperatorUpdateArgs} args - Arguments to update one Operator.
     * @example
     * // Update one Operator
     * const operator = await prisma.operator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OperatorUpdateArgs>(args: SelectSubset<T, OperatorUpdateArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Operators.
     * @param {OperatorDeleteManyArgs} args - Arguments to filter Operators to delete.
     * @example
     * // Delete a few Operators
     * const { count } = await prisma.operator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OperatorDeleteManyArgs>(args?: SelectSubset<T, OperatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Operators
     * const operator = await prisma.operator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OperatorUpdateManyArgs>(args: SelectSubset<T, OperatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Operators and returns the data updated in the database.
     * @param {OperatorUpdateManyAndReturnArgs} args - Arguments to update many Operators.
     * @example
     * // Update many Operators
     * const operator = await prisma.operator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Operators and only return the `id`
     * const operatorWithIdOnly = await prisma.operator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OperatorUpdateManyAndReturnArgs>(args: SelectSubset<T, OperatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Operator.
     * @param {OperatorUpsertArgs} args - Arguments to update or create a Operator.
     * @example
     * // Update or create a Operator
     * const operator = await prisma.operator.upsert({
     *   create: {
     *     // ... data to create a Operator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Operator we want to update
     *   }
     * })
     */
    upsert<T extends OperatorUpsertArgs>(args: SelectSubset<T, OperatorUpsertArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Operators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorCountArgs} args - Arguments to filter Operators to count.
     * @example
     * // Count the number of Operators
     * const count = await prisma.operator.count({
     *   where: {
     *     // ... the filter for the Operators we want to count
     *   }
     * })
    **/
    count<T extends OperatorCountArgs>(
      args?: Subset<T, OperatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OperatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Operator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OperatorAggregateArgs>(args: Subset<T, OperatorAggregateArgs>): Prisma.PrismaPromise<GetOperatorAggregateType<T>>

    /**
     * Group by Operator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OperatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OperatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OperatorGroupByArgs['orderBy'] }
        : { orderBy?: OperatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OperatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOperatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Operator model
   */
  readonly fields: OperatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Operator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OperatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    leads<T extends Operator$leadsArgs<ExtArgs> = {}>(args?: Subset<T, Operator$leadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leadNotes<T extends Operator$leadNotesArgs<ExtArgs> = {}>(args?: Subset<T, Operator$leadNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Operator model
   */
  interface OperatorFieldRefs {
    readonly id: FieldRef<"Operator", 'String'>
    readonly profileId: FieldRef<"Operator", 'String'>
    readonly name: FieldRef<"Operator", 'String'>
    readonly isActive: FieldRef<"Operator", 'Boolean'>
    readonly createdAt: FieldRef<"Operator", 'DateTime'>
    readonly updatedAt: FieldRef<"Operator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Operator findUnique
   */
  export type OperatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator findUniqueOrThrow
   */
  export type OperatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator findFirst
   */
  export type OperatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operators.
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operators.
     */
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Operator findFirstOrThrow
   */
  export type OperatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operator to fetch.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Operators.
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operators.
     */
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Operator findMany
   */
  export type OperatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter, which Operators to fetch.
     */
    where?: OperatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Operators to fetch.
     */
    orderBy?: OperatorOrderByWithRelationInput | OperatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Operators.
     */
    cursor?: OperatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Operators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Operators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Operators.
     */
    distinct?: OperatorScalarFieldEnum | OperatorScalarFieldEnum[]
  }

  /**
   * Operator create
   */
  export type OperatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Operator.
     */
    data: XOR<OperatorCreateInput, OperatorUncheckedCreateInput>
  }

  /**
   * Operator createMany
   */
  export type OperatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Operators.
     */
    data: OperatorCreateManyInput | OperatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Operator createManyAndReturn
   */
  export type OperatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * The data used to create many Operators.
     */
    data: OperatorCreateManyInput | OperatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operator update
   */
  export type OperatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Operator.
     */
    data: XOR<OperatorUpdateInput, OperatorUncheckedUpdateInput>
    /**
     * Choose, which Operator to update.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator updateMany
   */
  export type OperatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Operators.
     */
    data: XOR<OperatorUpdateManyMutationInput, OperatorUncheckedUpdateManyInput>
    /**
     * Filter which Operators to update
     */
    where?: OperatorWhereInput
    /**
     * Limit how many Operators to update.
     */
    limit?: number
  }

  /**
   * Operator updateManyAndReturn
   */
  export type OperatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * The data used to update Operators.
     */
    data: XOR<OperatorUpdateManyMutationInput, OperatorUncheckedUpdateManyInput>
    /**
     * Filter which Operators to update
     */
    where?: OperatorWhereInput
    /**
     * Limit how many Operators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Operator upsert
   */
  export type OperatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Operator to update in case it exists.
     */
    where: OperatorWhereUniqueInput
    /**
     * In case the Operator found by the `where` argument doesn't exist, create a new Operator with this data.
     */
    create: XOR<OperatorCreateInput, OperatorUncheckedCreateInput>
    /**
     * In case the Operator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OperatorUpdateInput, OperatorUncheckedUpdateInput>
  }

  /**
   * Operator delete
   */
  export type OperatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    /**
     * Filter which Operator to delete.
     */
    where: OperatorWhereUniqueInput
  }

  /**
   * Operator deleteMany
   */
  export type OperatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Operators to delete
     */
    where?: OperatorWhereInput
    /**
     * Limit how many Operators to delete.
     */
    limit?: number
  }

  /**
   * Operator.leads
   */
  export type Operator$leadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    cursor?: LeadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Operator.leadNotes
   */
  export type Operator$leadNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    where?: LeadNoteWhereInput
    orderBy?: LeadNoteOrderByWithRelationInput | LeadNoteOrderByWithRelationInput[]
    cursor?: LeadNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadNoteScalarFieldEnum | LeadNoteScalarFieldEnum[]
  }

  /**
   * Operator without action
   */
  export type OperatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
  }


  /**
   * Model LeadNote
   */

  export type AggregateLeadNote = {
    _count: LeadNoteCountAggregateOutputType | null
    _min: LeadNoteMinAggregateOutputType | null
    _max: LeadNoteMaxAggregateOutputType | null
  }

  export type LeadNoteMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    operatorId: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadNoteMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    operatorId: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadNoteCountAggregateOutputType = {
    id: number
    leadId: number
    operatorId: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadNoteMinAggregateInputType = {
    id?: true
    leadId?: true
    operatorId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadNoteMaxAggregateInputType = {
    id?: true
    leadId?: true
    operatorId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadNoteCountAggregateInputType = {
    id?: true
    leadId?: true
    operatorId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadNote to aggregate.
     */
    where?: LeadNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadNotes to fetch.
     */
    orderBy?: LeadNoteOrderByWithRelationInput | LeadNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadNotes
    **/
    _count?: true | LeadNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadNoteMaxAggregateInputType
  }

  export type GetLeadNoteAggregateType<T extends LeadNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadNote[P]>
      : GetScalarType<T[P], AggregateLeadNote[P]>
  }




  export type LeadNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadNoteWhereInput
    orderBy?: LeadNoteOrderByWithAggregationInput | LeadNoteOrderByWithAggregationInput[]
    by: LeadNoteScalarFieldEnum[] | LeadNoteScalarFieldEnum
    having?: LeadNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadNoteCountAggregateInputType | true
    _min?: LeadNoteMinAggregateInputType
    _max?: LeadNoteMaxAggregateInputType
  }

  export type LeadNoteGroupByOutputType = {
    id: string
    leadId: string
    operatorId: string | null
    content: string
    createdAt: Date
    updatedAt: Date
    _count: LeadNoteCountAggregateOutputType | null
    _min: LeadNoteMinAggregateOutputType | null
    _max: LeadNoteMaxAggregateOutputType | null
  }

  type GetLeadNoteGroupByPayload<T extends LeadNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadNoteGroupByOutputType[P]>
            : GetScalarType<T[P], LeadNoteGroupByOutputType[P]>
        }
      >
    >


  export type LeadNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    operatorId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    operator?: boolean | LeadNote$operatorArgs<ExtArgs>
  }, ExtArgs["result"]["leadNote"]>

  export type LeadNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    operatorId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    operator?: boolean | LeadNote$operatorArgs<ExtArgs>
  }, ExtArgs["result"]["leadNote"]>

  export type LeadNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    operatorId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    operator?: boolean | LeadNote$operatorArgs<ExtArgs>
  }, ExtArgs["result"]["leadNote"]>

  export type LeadNoteSelectScalar = {
    id?: boolean
    leadId?: boolean
    operatorId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "operatorId" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["leadNote"]>
  export type LeadNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    operator?: boolean | LeadNote$operatorArgs<ExtArgs>
  }
  export type LeadNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    operator?: boolean | LeadNote$operatorArgs<ExtArgs>
  }
  export type LeadNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
    operator?: boolean | LeadNote$operatorArgs<ExtArgs>
  }

  export type $LeadNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadNote"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
      operator: Prisma.$OperatorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      operatorId: string | null
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leadNote"]>
    composites: {}
  }

  type LeadNoteGetPayload<S extends boolean | null | undefined | LeadNoteDefaultArgs> = $Result.GetResult<Prisma.$LeadNotePayload, S>

  type LeadNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadNoteCountAggregateInputType | true
    }

  export interface LeadNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadNote'], meta: { name: 'LeadNote' } }
    /**
     * Find zero or one LeadNote that matches the filter.
     * @param {LeadNoteFindUniqueArgs} args - Arguments to find a LeadNote
     * @example
     * // Get one LeadNote
     * const leadNote = await prisma.leadNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadNoteFindUniqueArgs>(args: SelectSubset<T, LeadNoteFindUniqueArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadNoteFindUniqueOrThrowArgs} args - Arguments to find a LeadNote
     * @example
     * // Get one LeadNote
     * const leadNote = await prisma.leadNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteFindFirstArgs} args - Arguments to find a LeadNote
     * @example
     * // Get one LeadNote
     * const leadNote = await prisma.leadNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadNoteFindFirstArgs>(args?: SelectSubset<T, LeadNoteFindFirstArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteFindFirstOrThrowArgs} args - Arguments to find a LeadNote
     * @example
     * // Get one LeadNote
     * const leadNote = await prisma.leadNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadNotes
     * const leadNotes = await prisma.leadNote.findMany()
     * 
     * // Get first 10 LeadNotes
     * const leadNotes = await prisma.leadNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadNoteWithIdOnly = await prisma.leadNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadNoteFindManyArgs>(args?: SelectSubset<T, LeadNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadNote.
     * @param {LeadNoteCreateArgs} args - Arguments to create a LeadNote.
     * @example
     * // Create one LeadNote
     * const LeadNote = await prisma.leadNote.create({
     *   data: {
     *     // ... data to create a LeadNote
     *   }
     * })
     * 
     */
    create<T extends LeadNoteCreateArgs>(args: SelectSubset<T, LeadNoteCreateArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadNotes.
     * @param {LeadNoteCreateManyArgs} args - Arguments to create many LeadNotes.
     * @example
     * // Create many LeadNotes
     * const leadNote = await prisma.leadNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadNoteCreateManyArgs>(args?: SelectSubset<T, LeadNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadNotes and returns the data saved in the database.
     * @param {LeadNoteCreateManyAndReturnArgs} args - Arguments to create many LeadNotes.
     * @example
     * // Create many LeadNotes
     * const leadNote = await prisma.leadNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadNotes and only return the `id`
     * const leadNoteWithIdOnly = await prisma.leadNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadNote.
     * @param {LeadNoteDeleteArgs} args - Arguments to delete one LeadNote.
     * @example
     * // Delete one LeadNote
     * const LeadNote = await prisma.leadNote.delete({
     *   where: {
     *     // ... filter to delete one LeadNote
     *   }
     * })
     * 
     */
    delete<T extends LeadNoteDeleteArgs>(args: SelectSubset<T, LeadNoteDeleteArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadNote.
     * @param {LeadNoteUpdateArgs} args - Arguments to update one LeadNote.
     * @example
     * // Update one LeadNote
     * const leadNote = await prisma.leadNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadNoteUpdateArgs>(args: SelectSubset<T, LeadNoteUpdateArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadNotes.
     * @param {LeadNoteDeleteManyArgs} args - Arguments to filter LeadNotes to delete.
     * @example
     * // Delete a few LeadNotes
     * const { count } = await prisma.leadNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadNoteDeleteManyArgs>(args?: SelectSubset<T, LeadNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadNotes
     * const leadNote = await prisma.leadNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadNoteUpdateManyArgs>(args: SelectSubset<T, LeadNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadNotes and returns the data updated in the database.
     * @param {LeadNoteUpdateManyAndReturnArgs} args - Arguments to update many LeadNotes.
     * @example
     * // Update many LeadNotes
     * const leadNote = await prisma.leadNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadNotes and only return the `id`
     * const leadNoteWithIdOnly = await prisma.leadNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadNote.
     * @param {LeadNoteUpsertArgs} args - Arguments to update or create a LeadNote.
     * @example
     * // Update or create a LeadNote
     * const leadNote = await prisma.leadNote.upsert({
     *   create: {
     *     // ... data to create a LeadNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadNote we want to update
     *   }
     * })
     */
    upsert<T extends LeadNoteUpsertArgs>(args: SelectSubset<T, LeadNoteUpsertArgs<ExtArgs>>): Prisma__LeadNoteClient<$Result.GetResult<Prisma.$LeadNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteCountArgs} args - Arguments to filter LeadNotes to count.
     * @example
     * // Count the number of LeadNotes
     * const count = await prisma.leadNote.count({
     *   where: {
     *     // ... the filter for the LeadNotes we want to count
     *   }
     * })
    **/
    count<T extends LeadNoteCountArgs>(
      args?: Subset<T, LeadNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadNoteAggregateArgs>(args: Subset<T, LeadNoteAggregateArgs>): Prisma.PrismaPromise<GetLeadNoteAggregateType<T>>

    /**
     * Group by LeadNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadNoteGroupByArgs['orderBy'] }
        : { orderBy?: LeadNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadNote model
   */
  readonly fields: LeadNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    operator<T extends LeadNote$operatorArgs<ExtArgs> = {}>(args?: Subset<T, LeadNote$operatorArgs<ExtArgs>>): Prisma__OperatorClient<$Result.GetResult<Prisma.$OperatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadNote model
   */
  interface LeadNoteFieldRefs {
    readonly id: FieldRef<"LeadNote", 'String'>
    readonly leadId: FieldRef<"LeadNote", 'String'>
    readonly operatorId: FieldRef<"LeadNote", 'String'>
    readonly content: FieldRef<"LeadNote", 'String'>
    readonly createdAt: FieldRef<"LeadNote", 'DateTime'>
    readonly updatedAt: FieldRef<"LeadNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeadNote findUnique
   */
  export type LeadNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * Filter, which LeadNote to fetch.
     */
    where: LeadNoteWhereUniqueInput
  }

  /**
   * LeadNote findUniqueOrThrow
   */
  export type LeadNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * Filter, which LeadNote to fetch.
     */
    where: LeadNoteWhereUniqueInput
  }

  /**
   * LeadNote findFirst
   */
  export type LeadNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * Filter, which LeadNote to fetch.
     */
    where?: LeadNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadNotes to fetch.
     */
    orderBy?: LeadNoteOrderByWithRelationInput | LeadNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadNotes.
     */
    cursor?: LeadNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadNotes.
     */
    distinct?: LeadNoteScalarFieldEnum | LeadNoteScalarFieldEnum[]
  }

  /**
   * LeadNote findFirstOrThrow
   */
  export type LeadNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * Filter, which LeadNote to fetch.
     */
    where?: LeadNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadNotes to fetch.
     */
    orderBy?: LeadNoteOrderByWithRelationInput | LeadNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadNotes.
     */
    cursor?: LeadNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadNotes.
     */
    distinct?: LeadNoteScalarFieldEnum | LeadNoteScalarFieldEnum[]
  }

  /**
   * LeadNote findMany
   */
  export type LeadNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * Filter, which LeadNotes to fetch.
     */
    where?: LeadNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadNotes to fetch.
     */
    orderBy?: LeadNoteOrderByWithRelationInput | LeadNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadNotes.
     */
    cursor?: LeadNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadNotes.
     */
    distinct?: LeadNoteScalarFieldEnum | LeadNoteScalarFieldEnum[]
  }

  /**
   * LeadNote create
   */
  export type LeadNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadNote.
     */
    data: XOR<LeadNoteCreateInput, LeadNoteUncheckedCreateInput>
  }

  /**
   * LeadNote createMany
   */
  export type LeadNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadNotes.
     */
    data: LeadNoteCreateManyInput | LeadNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadNote createManyAndReturn
   */
  export type LeadNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * The data used to create many LeadNotes.
     */
    data: LeadNoteCreateManyInput | LeadNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadNote update
   */
  export type LeadNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadNote.
     */
    data: XOR<LeadNoteUpdateInput, LeadNoteUncheckedUpdateInput>
    /**
     * Choose, which LeadNote to update.
     */
    where: LeadNoteWhereUniqueInput
  }

  /**
   * LeadNote updateMany
   */
  export type LeadNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadNotes.
     */
    data: XOR<LeadNoteUpdateManyMutationInput, LeadNoteUncheckedUpdateManyInput>
    /**
     * Filter which LeadNotes to update
     */
    where?: LeadNoteWhereInput
    /**
     * Limit how many LeadNotes to update.
     */
    limit?: number
  }

  /**
   * LeadNote updateManyAndReturn
   */
  export type LeadNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * The data used to update LeadNotes.
     */
    data: XOR<LeadNoteUpdateManyMutationInput, LeadNoteUncheckedUpdateManyInput>
    /**
     * Filter which LeadNotes to update
     */
    where?: LeadNoteWhereInput
    /**
     * Limit how many LeadNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadNote upsert
   */
  export type LeadNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadNote to update in case it exists.
     */
    where: LeadNoteWhereUniqueInput
    /**
     * In case the LeadNote found by the `where` argument doesn't exist, create a new LeadNote with this data.
     */
    create: XOR<LeadNoteCreateInput, LeadNoteUncheckedCreateInput>
    /**
     * In case the LeadNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadNoteUpdateInput, LeadNoteUncheckedUpdateInput>
  }

  /**
   * LeadNote delete
   */
  export type LeadNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
    /**
     * Filter which LeadNote to delete.
     */
    where: LeadNoteWhereUniqueInput
  }

  /**
   * LeadNote deleteMany
   */
  export type LeadNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadNotes to delete
     */
    where?: LeadNoteWhereInput
    /**
     * Limit how many LeadNotes to delete.
     */
    limit?: number
  }

  /**
   * LeadNote.operator
   */
  export type LeadNote$operatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Operator
     */
    select?: OperatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Operator
     */
    omit?: OperatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OperatorInclude<ExtArgs> | null
    where?: OperatorWhereInput
  }

  /**
   * LeadNote without action
   */
  export type LeadNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadNote
     */
    select?: LeadNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadNote
     */
    omit?: LeadNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadNoteInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    leadId: string | null
    title: string | null
    message: string | null
    isRead: boolean | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    leadId: string | null
    title: string | null
    message: string | null
    isRead: boolean | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    profileId: number
    leadId: number
    title: number
    message: number
    isRead: number
    type: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    profileId?: true
    leadId?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    profileId?: true
    leadId?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    profileId?: true
    leadId?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    profileId: string
    leadId: string | null
    title: string
    message: string
    isRead: boolean
    type: string
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    profileId?: boolean
    leadId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "leadId" | "title" | "message" | "isRead" | "type" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      leadId: string | null
      title: string
      message: string
      isRead: boolean
      type: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly profileId: FieldRef<"Notification", 'String'>
    readonly leadId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly metadata: FieldRef<"Notification", 'Json'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    authUid: 'authUid',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const LeadScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    code: 'code',
    fullName: 'fullName',
    company: 'company',
    jobTitle: 'jobTitle',
    email: 'email',
    phone: 'phone',
    linkedinUrl: 'linkedinUrl',
    whatsappUrl: 'whatsappUrl',
    status: 'status',
    source: 'source',
    notes: 'notes',
    importBatchId: 'importBatchId',
    customSource: 'customSource',
    lastOperatorId: 'lastOperatorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const CadenceEngineScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CadenceEngineScalarFieldEnum = (typeof CadenceEngineScalarFieldEnum)[keyof typeof CadenceEngineScalarFieldEnum]


  export const CadenceStageScalarFieldEnum: {
    id: 'id',
    cadenceId: 'cadenceId',
    order: 'order',
    channel: 'channel',
    delayDays: 'delayDays',
    templateId: 'templateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CadenceStageScalarFieldEnum = (typeof CadenceStageScalarFieldEnum)[keyof typeof CadenceStageScalarFieldEnum]


  export const LeadCadenceProgressScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    leadId: 'leadId',
    cadenceId: 'cadenceId',
    currentStageOrder: 'currentStageOrder',
    nextStageOrder: 'nextStageOrder',
    status: 'status',
    pausedAt: 'pausedAt',
    finishedAt: 'finishedAt',
    exitReason: 'exitReason',
    nextScheduledAt: 'nextScheduledAt',
    lastActionAt: 'lastActionAt',
    version: 'version',
    lockedAt: 'lockedAt',
    lockedBy: 'lockedBy'
  };

  export type LeadCadenceProgressScalarFieldEnum = (typeof LeadCadenceProgressScalarFieldEnum)[keyof typeof LeadCadenceProgressScalarFieldEnum]


  export const LeadCadenceEventScalarFieldEnum: {
    id: 'id',
    leadCadenceProgressId: 'leadCadenceProgressId',
    leadId: 'leadId',
    action: 'action',
    fromStage: 'fromStage',
    toStage: 'toStage',
    operatorId: 'operatorId',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type LeadCadenceEventScalarFieldEnum = (typeof LeadCadenceEventScalarFieldEnum)[keyof typeof LeadCadenceEventScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    name: 'name',
    channel: 'channel',
    subject: 'subject',
    body: 'body',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const LeadHistoryScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    previousData: 'previousData',
    newData: 'newData',
    actionBy: 'actionBy',
    createdAt: 'createdAt'
  };

  export type LeadHistoryScalarFieldEnum = (typeof LeadHistoryScalarFieldEnum)[keyof typeof LeadHistoryScalarFieldEnum]


  export const OperatorScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    name: 'name',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OperatorScalarFieldEnum = (typeof OperatorScalarFieldEnum)[keyof typeof OperatorScalarFieldEnum]


  export const LeadNoteScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    operatorId: 'operatorId',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadNoteScalarFieldEnum = (typeof LeadNoteScalarFieldEnum)[keyof typeof LeadNoteScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    leadId: 'leadId',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    type: 'type',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'LeadStatus'
   */
  export type EnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus'>
    


  /**
   * Reference to a field of type 'LeadStatus[]'
   */
  export type ListEnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus[]'>
    


  /**
   * Reference to a field of type 'LeadSource'
   */
  export type EnumLeadSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadSource'>
    


  /**
   * Reference to a field of type 'LeadSource[]'
   */
  export type ListEnumLeadSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadSource[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TemplateChannel'
   */
  export type EnumTemplateChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TemplateChannel'>
    


  /**
   * Reference to a field of type 'TemplateChannel[]'
   */
  export type ListEnumTemplateChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TemplateChannel[]'>
    


  /**
   * Reference to a field of type 'CadenceStatus'
   */
  export type EnumCadenceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CadenceStatus'>
    


  /**
   * Reference to a field of type 'CadenceStatus[]'
   */
  export type ListEnumCadenceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CadenceStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    authUid?: StringFilter<"Profile"> | string
    name?: StringFilter<"Profile"> | string
    email?: StringFilter<"Profile"> | string
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    leads?: LeadListRelationFilter
    templates?: TemplateListRelationFilter
    operators?: OperatorListRelationFilter
    cadences?: CadenceEngineListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    authUid?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leads?: LeadOrderByRelationAggregateInput
    templates?: TemplateOrderByRelationAggregateInput
    operators?: OperatorOrderByRelationAggregateInput
    cadences?: CadenceEngineOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    authUid?: string
    email?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    name?: StringFilter<"Profile"> | string
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    leads?: LeadListRelationFilter
    templates?: TemplateListRelationFilter
    operators?: OperatorListRelationFilter
    cadences?: CadenceEngineListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "authUid" | "email">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    authUid?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    authUid?: StringWithAggregatesFilter<"Profile"> | string
    name?: StringWithAggregatesFilter<"Profile"> | string
    email?: StringWithAggregatesFilter<"Profile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    profileId?: StringFilter<"Lead"> | string
    code?: StringFilter<"Lead"> | string
    fullName?: StringFilter<"Lead"> | string
    company?: StringNullableFilter<"Lead"> | string | null
    jobTitle?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    whatsappUrl?: StringNullableFilter<"Lead"> | string | null
    status?: EnumLeadStatusFilter<"Lead"> | $Enums.LeadStatus
    source?: EnumLeadSourceFilter<"Lead"> | $Enums.LeadSource
    notes?: StringNullableFilter<"Lead"> | string | null
    importBatchId?: StringNullableFilter<"Lead"> | string | null
    customSource?: StringNullableFilter<"Lead"> | string | null
    lastOperatorId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    lastOperator?: XOR<OperatorNullableScalarRelationFilter, OperatorWhereInput> | null
    histories?: LeadHistoryListRelationFilter
    leadNotes?: LeadNoteListRelationFilter
    cadenceEngine?: XOR<LeadCadenceProgressNullableScalarRelationFilter, LeadCadenceProgressWhereInput> | null
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    code?: SortOrder
    fullName?: SortOrder
    company?: SortOrderInput | SortOrder
    jobTitle?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    whatsappUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrder
    notes?: SortOrderInput | SortOrder
    importBatchId?: SortOrderInput | SortOrder
    customSource?: SortOrderInput | SortOrder
    lastOperatorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    lastOperator?: OperatorOrderByWithRelationInput
    histories?: LeadHistoryOrderByRelationAggregateInput
    leadNotes?: LeadNoteOrderByRelationAggregateInput
    cadenceEngine?: LeadCadenceProgressOrderByWithRelationInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    profileId?: StringFilter<"Lead"> | string
    fullName?: StringFilter<"Lead"> | string
    company?: StringNullableFilter<"Lead"> | string | null
    jobTitle?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    whatsappUrl?: StringNullableFilter<"Lead"> | string | null
    status?: EnumLeadStatusFilter<"Lead"> | $Enums.LeadStatus
    source?: EnumLeadSourceFilter<"Lead"> | $Enums.LeadSource
    notes?: StringNullableFilter<"Lead"> | string | null
    importBatchId?: StringNullableFilter<"Lead"> | string | null
    customSource?: StringNullableFilter<"Lead"> | string | null
    lastOperatorId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    lastOperator?: XOR<OperatorNullableScalarRelationFilter, OperatorWhereInput> | null
    histories?: LeadHistoryListRelationFilter
    leadNotes?: LeadNoteListRelationFilter
    cadenceEngine?: XOR<LeadCadenceProgressNullableScalarRelationFilter, LeadCadenceProgressWhereInput> | null
  }, "id" | "code">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    code?: SortOrder
    fullName?: SortOrder
    company?: SortOrderInput | SortOrder
    jobTitle?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    linkedinUrl?: SortOrderInput | SortOrder
    whatsappUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrder
    notes?: SortOrderInput | SortOrder
    importBatchId?: SortOrderInput | SortOrder
    customSource?: SortOrderInput | SortOrder
    lastOperatorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    profileId?: StringWithAggregatesFilter<"Lead"> | string
    code?: StringWithAggregatesFilter<"Lead"> | string
    fullName?: StringWithAggregatesFilter<"Lead"> | string
    company?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    jobTitle?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    email?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    whatsappUrl?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    status?: EnumLeadStatusWithAggregatesFilter<"Lead"> | $Enums.LeadStatus
    source?: EnumLeadSourceWithAggregatesFilter<"Lead"> | $Enums.LeadSource
    notes?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    importBatchId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    customSource?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    lastOperatorId?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type CadenceEngineWhereInput = {
    AND?: CadenceEngineWhereInput | CadenceEngineWhereInput[]
    OR?: CadenceEngineWhereInput[]
    NOT?: CadenceEngineWhereInput | CadenceEngineWhereInput[]
    id?: StringFilter<"CadenceEngine"> | string
    profileId?: StringNullableFilter<"CadenceEngine"> | string | null
    name?: StringFilter<"CadenceEngine"> | string
    description?: StringNullableFilter<"CadenceEngine"> | string | null
    isActive?: BoolFilter<"CadenceEngine"> | boolean
    createdAt?: DateTimeFilter<"CadenceEngine"> | Date | string
    updatedAt?: DateTimeFilter<"CadenceEngine"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    stages?: CadenceStageListRelationFilter
    progressions?: LeadCadenceProgressListRelationFilter
  }

  export type CadenceEngineOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    stages?: CadenceStageOrderByRelationAggregateInput
    progressions?: LeadCadenceProgressOrderByRelationAggregateInput
  }

  export type CadenceEngineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CadenceEngineWhereInput | CadenceEngineWhereInput[]
    OR?: CadenceEngineWhereInput[]
    NOT?: CadenceEngineWhereInput | CadenceEngineWhereInput[]
    profileId?: StringNullableFilter<"CadenceEngine"> | string | null
    name?: StringFilter<"CadenceEngine"> | string
    description?: StringNullableFilter<"CadenceEngine"> | string | null
    isActive?: BoolFilter<"CadenceEngine"> | boolean
    createdAt?: DateTimeFilter<"CadenceEngine"> | Date | string
    updatedAt?: DateTimeFilter<"CadenceEngine"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    stages?: CadenceStageListRelationFilter
    progressions?: LeadCadenceProgressListRelationFilter
  }, "id">

  export type CadenceEngineOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CadenceEngineCountOrderByAggregateInput
    _max?: CadenceEngineMaxOrderByAggregateInput
    _min?: CadenceEngineMinOrderByAggregateInput
  }

  export type CadenceEngineScalarWhereWithAggregatesInput = {
    AND?: CadenceEngineScalarWhereWithAggregatesInput | CadenceEngineScalarWhereWithAggregatesInput[]
    OR?: CadenceEngineScalarWhereWithAggregatesInput[]
    NOT?: CadenceEngineScalarWhereWithAggregatesInput | CadenceEngineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CadenceEngine"> | string
    profileId?: StringNullableWithAggregatesFilter<"CadenceEngine"> | string | null
    name?: StringWithAggregatesFilter<"CadenceEngine"> | string
    description?: StringNullableWithAggregatesFilter<"CadenceEngine"> | string | null
    isActive?: BoolWithAggregatesFilter<"CadenceEngine"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CadenceEngine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CadenceEngine"> | Date | string
  }

  export type CadenceStageWhereInput = {
    AND?: CadenceStageWhereInput | CadenceStageWhereInput[]
    OR?: CadenceStageWhereInput[]
    NOT?: CadenceStageWhereInput | CadenceStageWhereInput[]
    id?: StringFilter<"CadenceStage"> | string
    cadenceId?: StringFilter<"CadenceStage"> | string
    order?: IntFilter<"CadenceStage"> | number
    channel?: EnumTemplateChannelFilter<"CadenceStage"> | $Enums.TemplateChannel
    delayDays?: IntFilter<"CadenceStage"> | number
    templateId?: StringNullableFilter<"CadenceStage"> | string | null
    createdAt?: DateTimeFilter<"CadenceStage"> | Date | string
    updatedAt?: DateTimeFilter<"CadenceStage"> | Date | string
    cadence?: XOR<CadenceEngineScalarRelationFilter, CadenceEngineWhereInput>
    template?: XOR<TemplateNullableScalarRelationFilter, TemplateWhereInput> | null
  }

  export type CadenceStageOrderByWithRelationInput = {
    id?: SortOrder
    cadenceId?: SortOrder
    order?: SortOrder
    channel?: SortOrder
    delayDays?: SortOrder
    templateId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cadence?: CadenceEngineOrderByWithRelationInput
    template?: TemplateOrderByWithRelationInput
  }

  export type CadenceStageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CadenceStageWhereInput | CadenceStageWhereInput[]
    OR?: CadenceStageWhereInput[]
    NOT?: CadenceStageWhereInput | CadenceStageWhereInput[]
    cadenceId?: StringFilter<"CadenceStage"> | string
    order?: IntFilter<"CadenceStage"> | number
    channel?: EnumTemplateChannelFilter<"CadenceStage"> | $Enums.TemplateChannel
    delayDays?: IntFilter<"CadenceStage"> | number
    templateId?: StringNullableFilter<"CadenceStage"> | string | null
    createdAt?: DateTimeFilter<"CadenceStage"> | Date | string
    updatedAt?: DateTimeFilter<"CadenceStage"> | Date | string
    cadence?: XOR<CadenceEngineScalarRelationFilter, CadenceEngineWhereInput>
    template?: XOR<TemplateNullableScalarRelationFilter, TemplateWhereInput> | null
  }, "id">

  export type CadenceStageOrderByWithAggregationInput = {
    id?: SortOrder
    cadenceId?: SortOrder
    order?: SortOrder
    channel?: SortOrder
    delayDays?: SortOrder
    templateId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CadenceStageCountOrderByAggregateInput
    _avg?: CadenceStageAvgOrderByAggregateInput
    _max?: CadenceStageMaxOrderByAggregateInput
    _min?: CadenceStageMinOrderByAggregateInput
    _sum?: CadenceStageSumOrderByAggregateInput
  }

  export type CadenceStageScalarWhereWithAggregatesInput = {
    AND?: CadenceStageScalarWhereWithAggregatesInput | CadenceStageScalarWhereWithAggregatesInput[]
    OR?: CadenceStageScalarWhereWithAggregatesInput[]
    NOT?: CadenceStageScalarWhereWithAggregatesInput | CadenceStageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CadenceStage"> | string
    cadenceId?: StringWithAggregatesFilter<"CadenceStage"> | string
    order?: IntWithAggregatesFilter<"CadenceStage"> | number
    channel?: EnumTemplateChannelWithAggregatesFilter<"CadenceStage"> | $Enums.TemplateChannel
    delayDays?: IntWithAggregatesFilter<"CadenceStage"> | number
    templateId?: StringNullableWithAggregatesFilter<"CadenceStage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CadenceStage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CadenceStage"> | Date | string
  }

  export type LeadCadenceProgressWhereInput = {
    AND?: LeadCadenceProgressWhereInput | LeadCadenceProgressWhereInput[]
    OR?: LeadCadenceProgressWhereInput[]
    NOT?: LeadCadenceProgressWhereInput | LeadCadenceProgressWhereInput[]
    id?: StringFilter<"LeadCadenceProgress"> | string
    profileId?: StringFilter<"LeadCadenceProgress"> | string
    leadId?: StringFilter<"LeadCadenceProgress"> | string
    cadenceId?: StringFilter<"LeadCadenceProgress"> | string
    currentStageOrder?: IntFilter<"LeadCadenceProgress"> | number
    nextStageOrder?: IntNullableFilter<"LeadCadenceProgress"> | number | null
    status?: EnumCadenceStatusFilter<"LeadCadenceProgress"> | $Enums.CadenceStatus
    pausedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    exitReason?: StringNullableFilter<"LeadCadenceProgress"> | string | null
    nextScheduledAt?: DateTimeFilter<"LeadCadenceProgress"> | Date | string
    lastActionAt?: DateTimeFilter<"LeadCadenceProgress"> | Date | string
    version?: IntFilter<"LeadCadenceProgress"> | number
    lockedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    lockedBy?: StringNullableFilter<"LeadCadenceProgress"> | string | null
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    cadence?: XOR<CadenceEngineScalarRelationFilter, CadenceEngineWhereInput>
    events?: LeadCadenceEventListRelationFilter
  }

  export type LeadCadenceProgressOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    cadenceId?: SortOrder
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrderInput | SortOrder
    status?: SortOrder
    pausedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    exitReason?: SortOrderInput | SortOrder
    nextScheduledAt?: SortOrder
    lastActionAt?: SortOrder
    version?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lockedBy?: SortOrderInput | SortOrder
    lead?: LeadOrderByWithRelationInput
    cadence?: CadenceEngineOrderByWithRelationInput
    events?: LeadCadenceEventOrderByRelationAggregateInput
  }

  export type LeadCadenceProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leadId?: string
    AND?: LeadCadenceProgressWhereInput | LeadCadenceProgressWhereInput[]
    OR?: LeadCadenceProgressWhereInput[]
    NOT?: LeadCadenceProgressWhereInput | LeadCadenceProgressWhereInput[]
    profileId?: StringFilter<"LeadCadenceProgress"> | string
    cadenceId?: StringFilter<"LeadCadenceProgress"> | string
    currentStageOrder?: IntFilter<"LeadCadenceProgress"> | number
    nextStageOrder?: IntNullableFilter<"LeadCadenceProgress"> | number | null
    status?: EnumCadenceStatusFilter<"LeadCadenceProgress"> | $Enums.CadenceStatus
    pausedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    exitReason?: StringNullableFilter<"LeadCadenceProgress"> | string | null
    nextScheduledAt?: DateTimeFilter<"LeadCadenceProgress"> | Date | string
    lastActionAt?: DateTimeFilter<"LeadCadenceProgress"> | Date | string
    version?: IntFilter<"LeadCadenceProgress"> | number
    lockedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    lockedBy?: StringNullableFilter<"LeadCadenceProgress"> | string | null
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    cadence?: XOR<CadenceEngineScalarRelationFilter, CadenceEngineWhereInput>
    events?: LeadCadenceEventListRelationFilter
  }, "id" | "leadId">

  export type LeadCadenceProgressOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    cadenceId?: SortOrder
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrderInput | SortOrder
    status?: SortOrder
    pausedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    exitReason?: SortOrderInput | SortOrder
    nextScheduledAt?: SortOrder
    lastActionAt?: SortOrder
    version?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lockedBy?: SortOrderInput | SortOrder
    _count?: LeadCadenceProgressCountOrderByAggregateInput
    _avg?: LeadCadenceProgressAvgOrderByAggregateInput
    _max?: LeadCadenceProgressMaxOrderByAggregateInput
    _min?: LeadCadenceProgressMinOrderByAggregateInput
    _sum?: LeadCadenceProgressSumOrderByAggregateInput
  }

  export type LeadCadenceProgressScalarWhereWithAggregatesInput = {
    AND?: LeadCadenceProgressScalarWhereWithAggregatesInput | LeadCadenceProgressScalarWhereWithAggregatesInput[]
    OR?: LeadCadenceProgressScalarWhereWithAggregatesInput[]
    NOT?: LeadCadenceProgressScalarWhereWithAggregatesInput | LeadCadenceProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadCadenceProgress"> | string
    profileId?: StringWithAggregatesFilter<"LeadCadenceProgress"> | string
    leadId?: StringWithAggregatesFilter<"LeadCadenceProgress"> | string
    cadenceId?: StringWithAggregatesFilter<"LeadCadenceProgress"> | string
    currentStageOrder?: IntWithAggregatesFilter<"LeadCadenceProgress"> | number
    nextStageOrder?: IntNullableWithAggregatesFilter<"LeadCadenceProgress"> | number | null
    status?: EnumCadenceStatusWithAggregatesFilter<"LeadCadenceProgress"> | $Enums.CadenceStatus
    pausedAt?: DateTimeNullableWithAggregatesFilter<"LeadCadenceProgress"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"LeadCadenceProgress"> | Date | string | null
    exitReason?: StringNullableWithAggregatesFilter<"LeadCadenceProgress"> | string | null
    nextScheduledAt?: DateTimeWithAggregatesFilter<"LeadCadenceProgress"> | Date | string
    lastActionAt?: DateTimeWithAggregatesFilter<"LeadCadenceProgress"> | Date | string
    version?: IntWithAggregatesFilter<"LeadCadenceProgress"> | number
    lockedAt?: DateTimeNullableWithAggregatesFilter<"LeadCadenceProgress"> | Date | string | null
    lockedBy?: StringNullableWithAggregatesFilter<"LeadCadenceProgress"> | string | null
  }

  export type LeadCadenceEventWhereInput = {
    AND?: LeadCadenceEventWhereInput | LeadCadenceEventWhereInput[]
    OR?: LeadCadenceEventWhereInput[]
    NOT?: LeadCadenceEventWhereInput | LeadCadenceEventWhereInput[]
    id?: StringFilter<"LeadCadenceEvent"> | string
    leadCadenceProgressId?: StringFilter<"LeadCadenceEvent"> | string
    leadId?: StringFilter<"LeadCadenceEvent"> | string
    action?: StringFilter<"LeadCadenceEvent"> | string
    fromStage?: IntNullableFilter<"LeadCadenceEvent"> | number | null
    toStage?: IntNullableFilter<"LeadCadenceEvent"> | number | null
    operatorId?: StringNullableFilter<"LeadCadenceEvent"> | string | null
    notes?: StringNullableFilter<"LeadCadenceEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadCadenceEvent"> | Date | string
    progression?: XOR<LeadCadenceProgressScalarRelationFilter, LeadCadenceProgressWhereInput>
  }

  export type LeadCadenceEventOrderByWithRelationInput = {
    id?: SortOrder
    leadCadenceProgressId?: SortOrder
    leadId?: SortOrder
    action?: SortOrder
    fromStage?: SortOrderInput | SortOrder
    toStage?: SortOrderInput | SortOrder
    operatorId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    progression?: LeadCadenceProgressOrderByWithRelationInput
  }

  export type LeadCadenceEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadCadenceEventWhereInput | LeadCadenceEventWhereInput[]
    OR?: LeadCadenceEventWhereInput[]
    NOT?: LeadCadenceEventWhereInput | LeadCadenceEventWhereInput[]
    leadCadenceProgressId?: StringFilter<"LeadCadenceEvent"> | string
    leadId?: StringFilter<"LeadCadenceEvent"> | string
    action?: StringFilter<"LeadCadenceEvent"> | string
    fromStage?: IntNullableFilter<"LeadCadenceEvent"> | number | null
    toStage?: IntNullableFilter<"LeadCadenceEvent"> | number | null
    operatorId?: StringNullableFilter<"LeadCadenceEvent"> | string | null
    notes?: StringNullableFilter<"LeadCadenceEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadCadenceEvent"> | Date | string
    progression?: XOR<LeadCadenceProgressScalarRelationFilter, LeadCadenceProgressWhereInput>
  }, "id">

  export type LeadCadenceEventOrderByWithAggregationInput = {
    id?: SortOrder
    leadCadenceProgressId?: SortOrder
    leadId?: SortOrder
    action?: SortOrder
    fromStage?: SortOrderInput | SortOrder
    toStage?: SortOrderInput | SortOrder
    operatorId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LeadCadenceEventCountOrderByAggregateInput
    _avg?: LeadCadenceEventAvgOrderByAggregateInput
    _max?: LeadCadenceEventMaxOrderByAggregateInput
    _min?: LeadCadenceEventMinOrderByAggregateInput
    _sum?: LeadCadenceEventSumOrderByAggregateInput
  }

  export type LeadCadenceEventScalarWhereWithAggregatesInput = {
    AND?: LeadCadenceEventScalarWhereWithAggregatesInput | LeadCadenceEventScalarWhereWithAggregatesInput[]
    OR?: LeadCadenceEventScalarWhereWithAggregatesInput[]
    NOT?: LeadCadenceEventScalarWhereWithAggregatesInput | LeadCadenceEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadCadenceEvent"> | string
    leadCadenceProgressId?: StringWithAggregatesFilter<"LeadCadenceEvent"> | string
    leadId?: StringWithAggregatesFilter<"LeadCadenceEvent"> | string
    action?: StringWithAggregatesFilter<"LeadCadenceEvent"> | string
    fromStage?: IntNullableWithAggregatesFilter<"LeadCadenceEvent"> | number | null
    toStage?: IntNullableWithAggregatesFilter<"LeadCadenceEvent"> | number | null
    operatorId?: StringNullableWithAggregatesFilter<"LeadCadenceEvent"> | string | null
    notes?: StringNullableWithAggregatesFilter<"LeadCadenceEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LeadCadenceEvent"> | Date | string
  }

  export type TemplateWhereInput = {
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    id?: StringFilter<"Template"> | string
    profileId?: StringFilter<"Template"> | string
    name?: StringFilter<"Template"> | string
    channel?: EnumTemplateChannelFilter<"Template"> | $Enums.TemplateChannel
    subject?: StringNullableFilter<"Template"> | string | null
    body?: StringFilter<"Template"> | string
    isActive?: BoolFilter<"Template"> | boolean
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    cadenceStages?: CadenceStageListRelationFilter
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    channel?: SortOrder
    subject?: SortOrderInput | SortOrder
    body?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    cadenceStages?: CadenceStageOrderByRelationAggregateInput
  }

  export type TemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TemplateWhereInput | TemplateWhereInput[]
    OR?: TemplateWhereInput[]
    NOT?: TemplateWhereInput | TemplateWhereInput[]
    profileId?: StringFilter<"Template"> | string
    name?: StringFilter<"Template"> | string
    channel?: EnumTemplateChannelFilter<"Template"> | $Enums.TemplateChannel
    subject?: StringNullableFilter<"Template"> | string | null
    body?: StringFilter<"Template"> | string
    isActive?: BoolFilter<"Template"> | boolean
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    cadenceStages?: CadenceStageListRelationFilter
  }, "id">

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    channel?: SortOrder
    subject?: SortOrderInput | SortOrder
    body?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    OR?: TemplateScalarWhereWithAggregatesInput[]
    NOT?: TemplateScalarWhereWithAggregatesInput | TemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Template"> | string
    profileId?: StringWithAggregatesFilter<"Template"> | string
    name?: StringWithAggregatesFilter<"Template"> | string
    channel?: EnumTemplateChannelWithAggregatesFilter<"Template"> | $Enums.TemplateChannel
    subject?: StringNullableWithAggregatesFilter<"Template"> | string | null
    body?: StringWithAggregatesFilter<"Template"> | string
    isActive?: BoolWithAggregatesFilter<"Template"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Template"> | Date | string
  }

  export type LeadHistoryWhereInput = {
    AND?: LeadHistoryWhereInput | LeadHistoryWhereInput[]
    OR?: LeadHistoryWhereInput[]
    NOT?: LeadHistoryWhereInput | LeadHistoryWhereInput[]
    id?: StringFilter<"LeadHistory"> | string
    leadId?: StringFilter<"LeadHistory"> | string
    previousData?: JsonFilter<"LeadHistory">
    newData?: JsonFilter<"LeadHistory">
    actionBy?: StringNullableFilter<"LeadHistory"> | string | null
    createdAt?: DateTimeFilter<"LeadHistory"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type LeadHistoryOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    actionBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type LeadHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadHistoryWhereInput | LeadHistoryWhereInput[]
    OR?: LeadHistoryWhereInput[]
    NOT?: LeadHistoryWhereInput | LeadHistoryWhereInput[]
    leadId?: StringFilter<"LeadHistory"> | string
    previousData?: JsonFilter<"LeadHistory">
    newData?: JsonFilter<"LeadHistory">
    actionBy?: StringNullableFilter<"LeadHistory"> | string | null
    createdAt?: DateTimeFilter<"LeadHistory"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id">

  export type LeadHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    actionBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LeadHistoryCountOrderByAggregateInput
    _max?: LeadHistoryMaxOrderByAggregateInput
    _min?: LeadHistoryMinOrderByAggregateInput
  }

  export type LeadHistoryScalarWhereWithAggregatesInput = {
    AND?: LeadHistoryScalarWhereWithAggregatesInput | LeadHistoryScalarWhereWithAggregatesInput[]
    OR?: LeadHistoryScalarWhereWithAggregatesInput[]
    NOT?: LeadHistoryScalarWhereWithAggregatesInput | LeadHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadHistory"> | string
    leadId?: StringWithAggregatesFilter<"LeadHistory"> | string
    previousData?: JsonWithAggregatesFilter<"LeadHistory">
    newData?: JsonWithAggregatesFilter<"LeadHistory">
    actionBy?: StringNullableWithAggregatesFilter<"LeadHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LeadHistory"> | Date | string
  }

  export type OperatorWhereInput = {
    AND?: OperatorWhereInput | OperatorWhereInput[]
    OR?: OperatorWhereInput[]
    NOT?: OperatorWhereInput | OperatorWhereInput[]
    id?: StringFilter<"Operator"> | string
    profileId?: StringFilter<"Operator"> | string
    name?: StringFilter<"Operator"> | string
    isActive?: BoolFilter<"Operator"> | boolean
    createdAt?: DateTimeFilter<"Operator"> | Date | string
    updatedAt?: DateTimeFilter<"Operator"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    leads?: LeadListRelationFilter
    leadNotes?: LeadNoteListRelationFilter
  }

  export type OperatorOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    leads?: LeadOrderByRelationAggregateInput
    leadNotes?: LeadNoteOrderByRelationAggregateInput
  }

  export type OperatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OperatorWhereInput | OperatorWhereInput[]
    OR?: OperatorWhereInput[]
    NOT?: OperatorWhereInput | OperatorWhereInput[]
    profileId?: StringFilter<"Operator"> | string
    name?: StringFilter<"Operator"> | string
    isActive?: BoolFilter<"Operator"> | boolean
    createdAt?: DateTimeFilter<"Operator"> | Date | string
    updatedAt?: DateTimeFilter<"Operator"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    leads?: LeadListRelationFilter
    leadNotes?: LeadNoteListRelationFilter
  }, "id">

  export type OperatorOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OperatorCountOrderByAggregateInput
    _max?: OperatorMaxOrderByAggregateInput
    _min?: OperatorMinOrderByAggregateInput
  }

  export type OperatorScalarWhereWithAggregatesInput = {
    AND?: OperatorScalarWhereWithAggregatesInput | OperatorScalarWhereWithAggregatesInput[]
    OR?: OperatorScalarWhereWithAggregatesInput[]
    NOT?: OperatorScalarWhereWithAggregatesInput | OperatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Operator"> | string
    profileId?: StringWithAggregatesFilter<"Operator"> | string
    name?: StringWithAggregatesFilter<"Operator"> | string
    isActive?: BoolWithAggregatesFilter<"Operator"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Operator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Operator"> | Date | string
  }

  export type LeadNoteWhereInput = {
    AND?: LeadNoteWhereInput | LeadNoteWhereInput[]
    OR?: LeadNoteWhereInput[]
    NOT?: LeadNoteWhereInput | LeadNoteWhereInput[]
    id?: StringFilter<"LeadNote"> | string
    leadId?: StringFilter<"LeadNote"> | string
    operatorId?: StringNullableFilter<"LeadNote"> | string | null
    content?: StringFilter<"LeadNote"> | string
    createdAt?: DateTimeFilter<"LeadNote"> | Date | string
    updatedAt?: DateTimeFilter<"LeadNote"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    operator?: XOR<OperatorNullableScalarRelationFilter, OperatorWhereInput> | null
  }

  export type LeadNoteOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    operatorId?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
    operator?: OperatorOrderByWithRelationInput
  }

  export type LeadNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadNoteWhereInput | LeadNoteWhereInput[]
    OR?: LeadNoteWhereInput[]
    NOT?: LeadNoteWhereInput | LeadNoteWhereInput[]
    leadId?: StringFilter<"LeadNote"> | string
    operatorId?: StringNullableFilter<"LeadNote"> | string | null
    content?: StringFilter<"LeadNote"> | string
    createdAt?: DateTimeFilter<"LeadNote"> | Date | string
    updatedAt?: DateTimeFilter<"LeadNote"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
    operator?: XOR<OperatorNullableScalarRelationFilter, OperatorWhereInput> | null
  }, "id">

  export type LeadNoteOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    operatorId?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadNoteCountOrderByAggregateInput
    _max?: LeadNoteMaxOrderByAggregateInput
    _min?: LeadNoteMinOrderByAggregateInput
  }

  export type LeadNoteScalarWhereWithAggregatesInput = {
    AND?: LeadNoteScalarWhereWithAggregatesInput | LeadNoteScalarWhereWithAggregatesInput[]
    OR?: LeadNoteScalarWhereWithAggregatesInput[]
    NOT?: LeadNoteScalarWhereWithAggregatesInput | LeadNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadNote"> | string
    leadId?: StringWithAggregatesFilter<"LeadNote"> | string
    operatorId?: StringNullableWithAggregatesFilter<"LeadNote"> | string | null
    content?: StringWithAggregatesFilter<"LeadNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LeadNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeadNote"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    profileId?: StringFilter<"Notification"> | string
    leadId?: StringNullableFilter<"Notification"> | string | null
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    metadata?: JsonNullableFilter<"Notification">
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrderInput | SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    profileId?: StringFilter<"Notification"> | string
    leadId?: StringNullableFilter<"Notification"> | string | null
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    metadata?: JsonNullableFilter<"Notification">
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrderInput | SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    profileId?: StringWithAggregatesFilter<"Notification"> | string
    leadId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    type?: StringWithAggregatesFilter<"Notification"> | string
    metadata?: JsonNullableWithAggregatesFilter<"Notification">
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutProfileInput
    templates?: TemplateCreateNestedManyWithoutProfileInput
    operators?: OperatorCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineCreateNestedManyWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutProfileInput
    templates?: TemplateUncheckedCreateNestedManyWithoutProfileInput
    operators?: OperatorUncheckedCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineUncheckedCreateNestedManyWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutProfileNestedInput
    templates?: TemplateUpdateManyWithoutProfileNestedInput
    operators?: OperatorUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutProfileNestedInput
    templates?: TemplateUncheckedUpdateManyWithoutProfileNestedInput
    operators?: OperatorUncheckedUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUncheckedUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutLeadsInput
    lastOperator?: OperatorCreateNestedOneWithoutLeadsInput
    histories?: LeadHistoryCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    histories?: LeadHistoryUncheckedCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressUncheckedCreateNestedOneWithoutLeadInput
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutLeadsNestedInput
    lastOperator?: OperatorUpdateOneWithoutLeadsNestedInput
    histories?: LeadHistoryUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: LeadHistoryUncheckedUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUncheckedUpdateOneWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceEngineCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutCadencesInput
    stages?: CadenceStageCreateNestedManyWithoutCadenceInput
    progressions?: LeadCadenceProgressCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineUncheckedCreateInput = {
    id?: string
    profileId?: string | null
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: CadenceStageUncheckedCreateNestedManyWithoutCadenceInput
    progressions?: LeadCadenceProgressUncheckedCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutCadencesNestedInput
    stages?: CadenceStageUpdateManyWithoutCadenceNestedInput
    progressions?: LeadCadenceProgressUpdateManyWithoutCadenceNestedInput
  }

  export type CadenceEngineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: CadenceStageUncheckedUpdateManyWithoutCadenceNestedInput
    progressions?: LeadCadenceProgressUncheckedUpdateManyWithoutCadenceNestedInput
  }

  export type CadenceEngineCreateManyInput = {
    id?: string
    profileId?: string | null
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceEngineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceEngineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageCreateInput = {
    id?: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cadence: CadenceEngineCreateNestedOneWithoutStagesInput
    template?: TemplateCreateNestedOneWithoutCadenceStagesInput
  }

  export type CadenceStageUncheckedCreateInput = {
    id?: string
    cadenceId: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceStageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cadence?: CadenceEngineUpdateOneRequiredWithoutStagesNestedInput
    template?: TemplateUpdateOneWithoutCadenceStagesNestedInput
  }

  export type CadenceStageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageCreateManyInput = {
    id?: string
    cadenceId: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceStageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCadenceProgressCreateInput = {
    id?: string
    profileId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    lead: LeadCreateNestedOneWithoutCadenceEngineInput
    cadence: CadenceEngineCreateNestedOneWithoutProgressionsInput
    events?: LeadCadenceEventCreateNestedManyWithoutProgressionInput
  }

  export type LeadCadenceProgressUncheckedCreateInput = {
    id?: string
    profileId: string
    leadId: string
    cadenceId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    events?: LeadCadenceEventUncheckedCreateNestedManyWithoutProgressionInput
  }

  export type LeadCadenceProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    lead?: LeadUpdateOneRequiredWithoutCadenceEngineNestedInput
    cadence?: CadenceEngineUpdateOneRequiredWithoutProgressionsNestedInput
    events?: LeadCadenceEventUpdateManyWithoutProgressionNestedInput
  }

  export type LeadCadenceProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    events?: LeadCadenceEventUncheckedUpdateManyWithoutProgressionNestedInput
  }

  export type LeadCadenceProgressCreateManyInput = {
    id?: string
    profileId: string
    leadId: string
    cadenceId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type LeadCadenceProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCadenceProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCadenceEventCreateInput = {
    id?: string
    leadId: string
    action: string
    fromStage?: number | null
    toStage?: number | null
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
    progression: LeadCadenceProgressCreateNestedOneWithoutEventsInput
  }

  export type LeadCadenceEventUncheckedCreateInput = {
    id?: string
    leadCadenceProgressId: string
    leadId: string
    action: string
    fromStage?: number | null
    toStage?: number | null
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type LeadCadenceEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progression?: LeadCadenceProgressUpdateOneRequiredWithoutEventsNestedInput
  }

  export type LeadCadenceEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadCadenceProgressId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCadenceEventCreateManyInput = {
    id?: string
    leadCadenceProgressId: string
    leadId: string
    action: string
    fromStage?: number | null
    toStage?: number | null
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type LeadCadenceEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCadenceEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadCadenceProgressId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateCreateInput = {
    id?: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutTemplatesInput
    cadenceStages?: CadenceStageCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateInput = {
    id?: string
    profileId: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cadenceStages?: CadenceStageUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutTemplatesNestedInput
    cadenceStages?: CadenceStageUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cadenceStages?: CadenceStageUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateCreateManyInput = {
    id?: string
    profileId: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadHistoryCreateInput = {
    id?: string
    previousData: JsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    actionBy?: string | null
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutHistoriesInput
  }

  export type LeadHistoryUncheckedCreateInput = {
    id?: string
    leadId: string
    previousData: JsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    actionBy?: string | null
    createdAt?: Date | string
  }

  export type LeadHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutHistoriesNestedInput
  }

  export type LeadHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadHistoryCreateManyInput = {
    id?: string
    leadId: string
    previousData: JsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    actionBy?: string | null
    createdAt?: Date | string
  }

  export type LeadHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperatorCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutOperatorsInput
    leads?: LeadCreateNestedManyWithoutLastOperatorInput
    leadNotes?: LeadNoteCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUncheckedCreateInput = {
    id?: string
    profileId: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutLastOperatorInput
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutOperatorsNestedInput
    leads?: LeadUpdateManyWithoutLastOperatorNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutLastOperatorNestedInput
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorCreateManyInput = {
    id?: string
    profileId: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OperatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutLeadNotesInput
    operator?: OperatorCreateNestedOneWithoutLeadNotesInput
  }

  export type LeadNoteUncheckedCreateInput = {
    id?: string
    leadId: string
    operatorId?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutLeadNotesNestedInput
    operator?: OperatorUpdateOneWithoutLeadNotesNestedInput
  }

  export type LeadNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteCreateManyInput = {
    id?: string
    leadId: string
    operatorId?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    leadId?: string | null
    title: string
    message: string
    isRead?: boolean
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    profileId: string
    leadId?: string | null
    title: string
    message: string
    isRead?: boolean
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    profileId: string
    leadId?: string | null
    title: string
    message: string
    isRead?: boolean
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LeadListRelationFilter = {
    every?: LeadWhereInput
    some?: LeadWhereInput
    none?: LeadWhereInput
  }

  export type TemplateListRelationFilter = {
    every?: TemplateWhereInput
    some?: TemplateWhereInput
    none?: TemplateWhereInput
  }

  export type OperatorListRelationFilter = {
    every?: OperatorWhereInput
    some?: OperatorWhereInput
    none?: OperatorWhereInput
  }

  export type CadenceEngineListRelationFilter = {
    every?: CadenceEngineWhereInput
    some?: CadenceEngineWhereInput
    none?: CadenceEngineWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type LeadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OperatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CadenceEngineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    authUid?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    authUid?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    authUid?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus
  }

  export type EnumLeadSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel>
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadSourceFilter<$PrismaModel> | $Enums.LeadSource
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type OperatorNullableScalarRelationFilter = {
    is?: OperatorWhereInput | null
    isNot?: OperatorWhereInput | null
  }

  export type LeadHistoryListRelationFilter = {
    every?: LeadHistoryWhereInput
    some?: LeadHistoryWhereInput
    none?: LeadHistoryWhereInput
  }

  export type LeadNoteListRelationFilter = {
    every?: LeadNoteWhereInput
    some?: LeadNoteWhereInput
    none?: LeadNoteWhereInput
  }

  export type LeadCadenceProgressNullableScalarRelationFilter = {
    is?: LeadCadenceProgressWhereInput | null
    isNot?: LeadCadenceProgressWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LeadHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    code?: SortOrder
    fullName?: SortOrder
    company?: SortOrder
    jobTitle?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    whatsappUrl?: SortOrder
    status?: SortOrder
    source?: SortOrder
    notes?: SortOrder
    importBatchId?: SortOrder
    customSource?: SortOrder
    lastOperatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    code?: SortOrder
    fullName?: SortOrder
    company?: SortOrder
    jobTitle?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    whatsappUrl?: SortOrder
    status?: SortOrder
    source?: SortOrder
    notes?: SortOrder
    importBatchId?: SortOrder
    customSource?: SortOrder
    lastOperatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    code?: SortOrder
    fullName?: SortOrder
    company?: SortOrder
    jobTitle?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    linkedinUrl?: SortOrder
    whatsappUrl?: SortOrder
    status?: SortOrder
    source?: SortOrder
    notes?: SortOrder
    importBatchId?: SortOrder
    customSource?: SortOrder
    lastOperatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadStatusFilter<$PrismaModel>
    _max?: NestedEnumLeadStatusFilter<$PrismaModel>
  }

  export type EnumLeadSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel>
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadSourceWithAggregatesFilter<$PrismaModel> | $Enums.LeadSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadSourceFilter<$PrismaModel>
    _max?: NestedEnumLeadSourceFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type CadenceStageListRelationFilter = {
    every?: CadenceStageWhereInput
    some?: CadenceStageWhereInput
    none?: CadenceStageWhereInput
  }

  export type LeadCadenceProgressListRelationFilter = {
    every?: LeadCadenceProgressWhereInput
    some?: LeadCadenceProgressWhereInput
    none?: LeadCadenceProgressWhereInput
  }

  export type CadenceStageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCadenceProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CadenceEngineCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CadenceEngineMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CadenceEngineMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTemplateChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateChannel | EnumTemplateChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateChannelFilter<$PrismaModel> | $Enums.TemplateChannel
  }

  export type CadenceEngineScalarRelationFilter = {
    is?: CadenceEngineWhereInput
    isNot?: CadenceEngineWhereInput
  }

  export type TemplateNullableScalarRelationFilter = {
    is?: TemplateWhereInput | null
    isNot?: TemplateWhereInput | null
  }

  export type CadenceStageCountOrderByAggregateInput = {
    id?: SortOrder
    cadenceId?: SortOrder
    order?: SortOrder
    channel?: SortOrder
    delayDays?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CadenceStageAvgOrderByAggregateInput = {
    order?: SortOrder
    delayDays?: SortOrder
  }

  export type CadenceStageMaxOrderByAggregateInput = {
    id?: SortOrder
    cadenceId?: SortOrder
    order?: SortOrder
    channel?: SortOrder
    delayDays?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CadenceStageMinOrderByAggregateInput = {
    id?: SortOrder
    cadenceId?: SortOrder
    order?: SortOrder
    channel?: SortOrder
    delayDays?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CadenceStageSumOrderByAggregateInput = {
    order?: SortOrder
    delayDays?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTemplateChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateChannel | EnumTemplateChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateChannelWithAggregatesFilter<$PrismaModel> | $Enums.TemplateChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTemplateChannelFilter<$PrismaModel>
    _max?: NestedEnumTemplateChannelFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumCadenceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CadenceStatus | EnumCadenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCadenceStatusFilter<$PrismaModel> | $Enums.CadenceStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type LeadCadenceEventListRelationFilter = {
    every?: LeadCadenceEventWhereInput
    some?: LeadCadenceEventWhereInput
    none?: LeadCadenceEventWhereInput
  }

  export type LeadCadenceEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCadenceProgressCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    cadenceId?: SortOrder
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrder
    status?: SortOrder
    pausedAt?: SortOrder
    finishedAt?: SortOrder
    exitReason?: SortOrder
    nextScheduledAt?: SortOrder
    lastActionAt?: SortOrder
    version?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type LeadCadenceProgressAvgOrderByAggregateInput = {
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrder
    version?: SortOrder
  }

  export type LeadCadenceProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    cadenceId?: SortOrder
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrder
    status?: SortOrder
    pausedAt?: SortOrder
    finishedAt?: SortOrder
    exitReason?: SortOrder
    nextScheduledAt?: SortOrder
    lastActionAt?: SortOrder
    version?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type LeadCadenceProgressMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    cadenceId?: SortOrder
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrder
    status?: SortOrder
    pausedAt?: SortOrder
    finishedAt?: SortOrder
    exitReason?: SortOrder
    nextScheduledAt?: SortOrder
    lastActionAt?: SortOrder
    version?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type LeadCadenceProgressSumOrderByAggregateInput = {
    currentStageOrder?: SortOrder
    nextStageOrder?: SortOrder
    version?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumCadenceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CadenceStatus | EnumCadenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCadenceStatusWithAggregatesFilter<$PrismaModel> | $Enums.CadenceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCadenceStatusFilter<$PrismaModel>
    _max?: NestedEnumCadenceStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type LeadCadenceProgressScalarRelationFilter = {
    is?: LeadCadenceProgressWhereInput
    isNot?: LeadCadenceProgressWhereInput
  }

  export type LeadCadenceEventCountOrderByAggregateInput = {
    id?: SortOrder
    leadCadenceProgressId?: SortOrder
    leadId?: SortOrder
    action?: SortOrder
    fromStage?: SortOrder
    toStage?: SortOrder
    operatorId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadCadenceEventAvgOrderByAggregateInput = {
    fromStage?: SortOrder
    toStage?: SortOrder
  }

  export type LeadCadenceEventMaxOrderByAggregateInput = {
    id?: SortOrder
    leadCadenceProgressId?: SortOrder
    leadId?: SortOrder
    action?: SortOrder
    fromStage?: SortOrder
    toStage?: SortOrder
    operatorId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadCadenceEventMinOrderByAggregateInput = {
    id?: SortOrder
    leadCadenceProgressId?: SortOrder
    leadId?: SortOrder
    action?: SortOrder
    fromStage?: SortOrder
    toStage?: SortOrder
    operatorId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadCadenceEventSumOrderByAggregateInput = {
    fromStage?: SortOrder
    toStage?: SortOrder
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    channel?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    channel?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    channel?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LeadHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    actionBy?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    actionBy?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    actionBy?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type OperatorCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OperatorMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OperatorMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadNoteCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    operatorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    operatorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadNoteMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    operatorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    leadId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LeadCreateNestedManyWithoutProfileInput = {
    create?: XOR<LeadCreateWithoutProfileInput, LeadUncheckedCreateWithoutProfileInput> | LeadCreateWithoutProfileInput[] | LeadUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutProfileInput | LeadCreateOrConnectWithoutProfileInput[]
    createMany?: LeadCreateManyProfileInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type TemplateCreateNestedManyWithoutProfileInput = {
    create?: XOR<TemplateCreateWithoutProfileInput, TemplateUncheckedCreateWithoutProfileInput> | TemplateCreateWithoutProfileInput[] | TemplateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutProfileInput | TemplateCreateOrConnectWithoutProfileInput[]
    createMany?: TemplateCreateManyProfileInputEnvelope
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
  }

  export type OperatorCreateNestedManyWithoutProfileInput = {
    create?: XOR<OperatorCreateWithoutProfileInput, OperatorUncheckedCreateWithoutProfileInput> | OperatorCreateWithoutProfileInput[] | OperatorUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutProfileInput | OperatorCreateOrConnectWithoutProfileInput[]
    createMany?: OperatorCreateManyProfileInputEnvelope
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
  }

  export type CadenceEngineCreateNestedManyWithoutProfileInput = {
    create?: XOR<CadenceEngineCreateWithoutProfileInput, CadenceEngineUncheckedCreateWithoutProfileInput> | CadenceEngineCreateWithoutProfileInput[] | CadenceEngineUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutProfileInput | CadenceEngineCreateOrConnectWithoutProfileInput[]
    createMany?: CadenceEngineCreateManyProfileInputEnvelope
    connect?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutProfileInput = {
    create?: XOR<NotificationCreateWithoutProfileInput, NotificationUncheckedCreateWithoutProfileInput> | NotificationCreateWithoutProfileInput[] | NotificationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutProfileInput | NotificationCreateOrConnectWithoutProfileInput[]
    createMany?: NotificationCreateManyProfileInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<LeadCreateWithoutProfileInput, LeadUncheckedCreateWithoutProfileInput> | LeadCreateWithoutProfileInput[] | LeadUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutProfileInput | LeadCreateOrConnectWithoutProfileInput[]
    createMany?: LeadCreateManyProfileInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type TemplateUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<TemplateCreateWithoutProfileInput, TemplateUncheckedCreateWithoutProfileInput> | TemplateCreateWithoutProfileInput[] | TemplateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutProfileInput | TemplateCreateOrConnectWithoutProfileInput[]
    createMany?: TemplateCreateManyProfileInputEnvelope
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
  }

  export type OperatorUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<OperatorCreateWithoutProfileInput, OperatorUncheckedCreateWithoutProfileInput> | OperatorCreateWithoutProfileInput[] | OperatorUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutProfileInput | OperatorCreateOrConnectWithoutProfileInput[]
    createMany?: OperatorCreateManyProfileInputEnvelope
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
  }

  export type CadenceEngineUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<CadenceEngineCreateWithoutProfileInput, CadenceEngineUncheckedCreateWithoutProfileInput> | CadenceEngineCreateWithoutProfileInput[] | CadenceEngineUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutProfileInput | CadenceEngineCreateOrConnectWithoutProfileInput[]
    createMany?: CadenceEngineCreateManyProfileInputEnvelope
    connect?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<NotificationCreateWithoutProfileInput, NotificationUncheckedCreateWithoutProfileInput> | NotificationCreateWithoutProfileInput[] | NotificationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutProfileInput | NotificationCreateOrConnectWithoutProfileInput[]
    createMany?: NotificationCreateManyProfileInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LeadUpdateManyWithoutProfileNestedInput = {
    create?: XOR<LeadCreateWithoutProfileInput, LeadUncheckedCreateWithoutProfileInput> | LeadCreateWithoutProfileInput[] | LeadUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutProfileInput | LeadCreateOrConnectWithoutProfileInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutProfileInput | LeadUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: LeadCreateManyProfileInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutProfileInput | LeadUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutProfileInput | LeadUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type TemplateUpdateManyWithoutProfileNestedInput = {
    create?: XOR<TemplateCreateWithoutProfileInput, TemplateUncheckedCreateWithoutProfileInput> | TemplateCreateWithoutProfileInput[] | TemplateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutProfileInput | TemplateCreateOrConnectWithoutProfileInput[]
    upsert?: TemplateUpsertWithWhereUniqueWithoutProfileInput | TemplateUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: TemplateCreateManyProfileInputEnvelope
    set?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    disconnect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    delete?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    update?: TemplateUpdateWithWhereUniqueWithoutProfileInput | TemplateUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: TemplateUpdateManyWithWhereWithoutProfileInput | TemplateUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
  }

  export type OperatorUpdateManyWithoutProfileNestedInput = {
    create?: XOR<OperatorCreateWithoutProfileInput, OperatorUncheckedCreateWithoutProfileInput> | OperatorCreateWithoutProfileInput[] | OperatorUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutProfileInput | OperatorCreateOrConnectWithoutProfileInput[]
    upsert?: OperatorUpsertWithWhereUniqueWithoutProfileInput | OperatorUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: OperatorCreateManyProfileInputEnvelope
    set?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    disconnect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    delete?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    update?: OperatorUpdateWithWhereUniqueWithoutProfileInput | OperatorUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: OperatorUpdateManyWithWhereWithoutProfileInput | OperatorUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
  }

  export type CadenceEngineUpdateManyWithoutProfileNestedInput = {
    create?: XOR<CadenceEngineCreateWithoutProfileInput, CadenceEngineUncheckedCreateWithoutProfileInput> | CadenceEngineCreateWithoutProfileInput[] | CadenceEngineUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutProfileInput | CadenceEngineCreateOrConnectWithoutProfileInput[]
    upsert?: CadenceEngineUpsertWithWhereUniqueWithoutProfileInput | CadenceEngineUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: CadenceEngineCreateManyProfileInputEnvelope
    set?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    disconnect?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    delete?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    connect?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    update?: CadenceEngineUpdateWithWhereUniqueWithoutProfileInput | CadenceEngineUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: CadenceEngineUpdateManyWithWhereWithoutProfileInput | CadenceEngineUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: CadenceEngineScalarWhereInput | CadenceEngineScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutProfileNestedInput = {
    create?: XOR<NotificationCreateWithoutProfileInput, NotificationUncheckedCreateWithoutProfileInput> | NotificationCreateWithoutProfileInput[] | NotificationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutProfileInput | NotificationCreateOrConnectWithoutProfileInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutProfileInput | NotificationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: NotificationCreateManyProfileInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutProfileInput | NotificationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutProfileInput | NotificationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<LeadCreateWithoutProfileInput, LeadUncheckedCreateWithoutProfileInput> | LeadCreateWithoutProfileInput[] | LeadUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutProfileInput | LeadCreateOrConnectWithoutProfileInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutProfileInput | LeadUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: LeadCreateManyProfileInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutProfileInput | LeadUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutProfileInput | LeadUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type TemplateUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<TemplateCreateWithoutProfileInput, TemplateUncheckedCreateWithoutProfileInput> | TemplateCreateWithoutProfileInput[] | TemplateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: TemplateCreateOrConnectWithoutProfileInput | TemplateCreateOrConnectWithoutProfileInput[]
    upsert?: TemplateUpsertWithWhereUniqueWithoutProfileInput | TemplateUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: TemplateCreateManyProfileInputEnvelope
    set?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    disconnect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    delete?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    connect?: TemplateWhereUniqueInput | TemplateWhereUniqueInput[]
    update?: TemplateUpdateWithWhereUniqueWithoutProfileInput | TemplateUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: TemplateUpdateManyWithWhereWithoutProfileInput | TemplateUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
  }

  export type OperatorUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<OperatorCreateWithoutProfileInput, OperatorUncheckedCreateWithoutProfileInput> | OperatorCreateWithoutProfileInput[] | OperatorUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: OperatorCreateOrConnectWithoutProfileInput | OperatorCreateOrConnectWithoutProfileInput[]
    upsert?: OperatorUpsertWithWhereUniqueWithoutProfileInput | OperatorUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: OperatorCreateManyProfileInputEnvelope
    set?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    disconnect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    delete?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    connect?: OperatorWhereUniqueInput | OperatorWhereUniqueInput[]
    update?: OperatorUpdateWithWhereUniqueWithoutProfileInput | OperatorUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: OperatorUpdateManyWithWhereWithoutProfileInput | OperatorUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
  }

  export type CadenceEngineUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<CadenceEngineCreateWithoutProfileInput, CadenceEngineUncheckedCreateWithoutProfileInput> | CadenceEngineCreateWithoutProfileInput[] | CadenceEngineUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutProfileInput | CadenceEngineCreateOrConnectWithoutProfileInput[]
    upsert?: CadenceEngineUpsertWithWhereUniqueWithoutProfileInput | CadenceEngineUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: CadenceEngineCreateManyProfileInputEnvelope
    set?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    disconnect?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    delete?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    connect?: CadenceEngineWhereUniqueInput | CadenceEngineWhereUniqueInput[]
    update?: CadenceEngineUpdateWithWhereUniqueWithoutProfileInput | CadenceEngineUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: CadenceEngineUpdateManyWithWhereWithoutProfileInput | CadenceEngineUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: CadenceEngineScalarWhereInput | CadenceEngineScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<NotificationCreateWithoutProfileInput, NotificationUncheckedCreateWithoutProfileInput> | NotificationCreateWithoutProfileInput[] | NotificationUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutProfileInput | NotificationCreateOrConnectWithoutProfileInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutProfileInput | NotificationUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: NotificationCreateManyProfileInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutProfileInput | NotificationUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutProfileInput | NotificationUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutLeadsInput = {
    create?: XOR<ProfileCreateWithoutLeadsInput, ProfileUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutLeadsInput
    connect?: ProfileWhereUniqueInput
  }

  export type OperatorCreateNestedOneWithoutLeadsInput = {
    create?: XOR<OperatorCreateWithoutLeadsInput, OperatorUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutLeadsInput
    connect?: OperatorWhereUniqueInput
  }

  export type LeadHistoryCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadHistoryCreateWithoutLeadInput, LeadHistoryUncheckedCreateWithoutLeadInput> | LeadHistoryCreateWithoutLeadInput[] | LeadHistoryUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadHistoryCreateOrConnectWithoutLeadInput | LeadHistoryCreateOrConnectWithoutLeadInput[]
    createMany?: LeadHistoryCreateManyLeadInputEnvelope
    connect?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
  }

  export type LeadNoteCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadNoteCreateWithoutLeadInput, LeadNoteUncheckedCreateWithoutLeadInput> | LeadNoteCreateWithoutLeadInput[] | LeadNoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutLeadInput | LeadNoteCreateOrConnectWithoutLeadInput[]
    createMany?: LeadNoteCreateManyLeadInputEnvelope
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
  }

  export type LeadCadenceProgressCreateNestedOneWithoutLeadInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutLeadInput, LeadCadenceProgressUncheckedCreateWithoutLeadInput>
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutLeadInput
    connect?: LeadCadenceProgressWhereUniqueInput
  }

  export type LeadHistoryUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadHistoryCreateWithoutLeadInput, LeadHistoryUncheckedCreateWithoutLeadInput> | LeadHistoryCreateWithoutLeadInput[] | LeadHistoryUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadHistoryCreateOrConnectWithoutLeadInput | LeadHistoryCreateOrConnectWithoutLeadInput[]
    createMany?: LeadHistoryCreateManyLeadInputEnvelope
    connect?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
  }

  export type LeadNoteUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadNoteCreateWithoutLeadInput, LeadNoteUncheckedCreateWithoutLeadInput> | LeadNoteCreateWithoutLeadInput[] | LeadNoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutLeadInput | LeadNoteCreateOrConnectWithoutLeadInput[]
    createMany?: LeadNoteCreateManyLeadInputEnvelope
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
  }

  export type LeadCadenceProgressUncheckedCreateNestedOneWithoutLeadInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutLeadInput, LeadCadenceProgressUncheckedCreateWithoutLeadInput>
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutLeadInput
    connect?: LeadCadenceProgressWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumLeadStatusFieldUpdateOperationsInput = {
    set?: $Enums.LeadStatus
  }

  export type EnumLeadSourceFieldUpdateOperationsInput = {
    set?: $Enums.LeadSource
  }

  export type ProfileUpdateOneRequiredWithoutLeadsNestedInput = {
    create?: XOR<ProfileCreateWithoutLeadsInput, ProfileUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutLeadsInput
    upsert?: ProfileUpsertWithoutLeadsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutLeadsInput, ProfileUpdateWithoutLeadsInput>, ProfileUncheckedUpdateWithoutLeadsInput>
  }

  export type OperatorUpdateOneWithoutLeadsNestedInput = {
    create?: XOR<OperatorCreateWithoutLeadsInput, OperatorUncheckedCreateWithoutLeadsInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutLeadsInput
    upsert?: OperatorUpsertWithoutLeadsInput
    disconnect?: OperatorWhereInput | boolean
    delete?: OperatorWhereInput | boolean
    connect?: OperatorWhereUniqueInput
    update?: XOR<XOR<OperatorUpdateToOneWithWhereWithoutLeadsInput, OperatorUpdateWithoutLeadsInput>, OperatorUncheckedUpdateWithoutLeadsInput>
  }

  export type LeadHistoryUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadHistoryCreateWithoutLeadInput, LeadHistoryUncheckedCreateWithoutLeadInput> | LeadHistoryCreateWithoutLeadInput[] | LeadHistoryUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadHistoryCreateOrConnectWithoutLeadInput | LeadHistoryCreateOrConnectWithoutLeadInput[]
    upsert?: LeadHistoryUpsertWithWhereUniqueWithoutLeadInput | LeadHistoryUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadHistoryCreateManyLeadInputEnvelope
    set?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    disconnect?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    delete?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    connect?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    update?: LeadHistoryUpdateWithWhereUniqueWithoutLeadInput | LeadHistoryUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadHistoryUpdateManyWithWhereWithoutLeadInput | LeadHistoryUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadHistoryScalarWhereInput | LeadHistoryScalarWhereInput[]
  }

  export type LeadNoteUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadNoteCreateWithoutLeadInput, LeadNoteUncheckedCreateWithoutLeadInput> | LeadNoteCreateWithoutLeadInput[] | LeadNoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutLeadInput | LeadNoteCreateOrConnectWithoutLeadInput[]
    upsert?: LeadNoteUpsertWithWhereUniqueWithoutLeadInput | LeadNoteUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadNoteCreateManyLeadInputEnvelope
    set?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    disconnect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    delete?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    update?: LeadNoteUpdateWithWhereUniqueWithoutLeadInput | LeadNoteUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadNoteUpdateManyWithWhereWithoutLeadInput | LeadNoteUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadNoteScalarWhereInput | LeadNoteScalarWhereInput[]
  }

  export type LeadCadenceProgressUpdateOneWithoutLeadNestedInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutLeadInput, LeadCadenceProgressUncheckedCreateWithoutLeadInput>
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutLeadInput
    upsert?: LeadCadenceProgressUpsertWithoutLeadInput
    disconnect?: LeadCadenceProgressWhereInput | boolean
    delete?: LeadCadenceProgressWhereInput | boolean
    connect?: LeadCadenceProgressWhereUniqueInput
    update?: XOR<XOR<LeadCadenceProgressUpdateToOneWithWhereWithoutLeadInput, LeadCadenceProgressUpdateWithoutLeadInput>, LeadCadenceProgressUncheckedUpdateWithoutLeadInput>
  }

  export type LeadHistoryUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadHistoryCreateWithoutLeadInput, LeadHistoryUncheckedCreateWithoutLeadInput> | LeadHistoryCreateWithoutLeadInput[] | LeadHistoryUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadHistoryCreateOrConnectWithoutLeadInput | LeadHistoryCreateOrConnectWithoutLeadInput[]
    upsert?: LeadHistoryUpsertWithWhereUniqueWithoutLeadInput | LeadHistoryUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadHistoryCreateManyLeadInputEnvelope
    set?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    disconnect?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    delete?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    connect?: LeadHistoryWhereUniqueInput | LeadHistoryWhereUniqueInput[]
    update?: LeadHistoryUpdateWithWhereUniqueWithoutLeadInput | LeadHistoryUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadHistoryUpdateManyWithWhereWithoutLeadInput | LeadHistoryUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadHistoryScalarWhereInput | LeadHistoryScalarWhereInput[]
  }

  export type LeadNoteUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadNoteCreateWithoutLeadInput, LeadNoteUncheckedCreateWithoutLeadInput> | LeadNoteCreateWithoutLeadInput[] | LeadNoteUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutLeadInput | LeadNoteCreateOrConnectWithoutLeadInput[]
    upsert?: LeadNoteUpsertWithWhereUniqueWithoutLeadInput | LeadNoteUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadNoteCreateManyLeadInputEnvelope
    set?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    disconnect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    delete?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    update?: LeadNoteUpdateWithWhereUniqueWithoutLeadInput | LeadNoteUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadNoteUpdateManyWithWhereWithoutLeadInput | LeadNoteUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadNoteScalarWhereInput | LeadNoteScalarWhereInput[]
  }

  export type LeadCadenceProgressUncheckedUpdateOneWithoutLeadNestedInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutLeadInput, LeadCadenceProgressUncheckedCreateWithoutLeadInput>
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutLeadInput
    upsert?: LeadCadenceProgressUpsertWithoutLeadInput
    disconnect?: LeadCadenceProgressWhereInput | boolean
    delete?: LeadCadenceProgressWhereInput | boolean
    connect?: LeadCadenceProgressWhereUniqueInput
    update?: XOR<XOR<LeadCadenceProgressUpdateToOneWithWhereWithoutLeadInput, LeadCadenceProgressUpdateWithoutLeadInput>, LeadCadenceProgressUncheckedUpdateWithoutLeadInput>
  }

  export type ProfileCreateNestedOneWithoutCadencesInput = {
    create?: XOR<ProfileCreateWithoutCadencesInput, ProfileUncheckedCreateWithoutCadencesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCadencesInput
    connect?: ProfileWhereUniqueInput
  }

  export type CadenceStageCreateNestedManyWithoutCadenceInput = {
    create?: XOR<CadenceStageCreateWithoutCadenceInput, CadenceStageUncheckedCreateWithoutCadenceInput> | CadenceStageCreateWithoutCadenceInput[] | CadenceStageUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutCadenceInput | CadenceStageCreateOrConnectWithoutCadenceInput[]
    createMany?: CadenceStageCreateManyCadenceInputEnvelope
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
  }

  export type LeadCadenceProgressCreateNestedManyWithoutCadenceInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutCadenceInput, LeadCadenceProgressUncheckedCreateWithoutCadenceInput> | LeadCadenceProgressCreateWithoutCadenceInput[] | LeadCadenceProgressUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutCadenceInput | LeadCadenceProgressCreateOrConnectWithoutCadenceInput[]
    createMany?: LeadCadenceProgressCreateManyCadenceInputEnvelope
    connect?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
  }

  export type CadenceStageUncheckedCreateNestedManyWithoutCadenceInput = {
    create?: XOR<CadenceStageCreateWithoutCadenceInput, CadenceStageUncheckedCreateWithoutCadenceInput> | CadenceStageCreateWithoutCadenceInput[] | CadenceStageUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutCadenceInput | CadenceStageCreateOrConnectWithoutCadenceInput[]
    createMany?: CadenceStageCreateManyCadenceInputEnvelope
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
  }

  export type LeadCadenceProgressUncheckedCreateNestedManyWithoutCadenceInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutCadenceInput, LeadCadenceProgressUncheckedCreateWithoutCadenceInput> | LeadCadenceProgressCreateWithoutCadenceInput[] | LeadCadenceProgressUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutCadenceInput | LeadCadenceProgressCreateOrConnectWithoutCadenceInput[]
    createMany?: LeadCadenceProgressCreateManyCadenceInputEnvelope
    connect?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProfileUpdateOneWithoutCadencesNestedInput = {
    create?: XOR<ProfileCreateWithoutCadencesInput, ProfileUncheckedCreateWithoutCadencesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCadencesInput
    upsert?: ProfileUpsertWithoutCadencesInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutCadencesInput, ProfileUpdateWithoutCadencesInput>, ProfileUncheckedUpdateWithoutCadencesInput>
  }

  export type CadenceStageUpdateManyWithoutCadenceNestedInput = {
    create?: XOR<CadenceStageCreateWithoutCadenceInput, CadenceStageUncheckedCreateWithoutCadenceInput> | CadenceStageCreateWithoutCadenceInput[] | CadenceStageUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutCadenceInput | CadenceStageCreateOrConnectWithoutCadenceInput[]
    upsert?: CadenceStageUpsertWithWhereUniqueWithoutCadenceInput | CadenceStageUpsertWithWhereUniqueWithoutCadenceInput[]
    createMany?: CadenceStageCreateManyCadenceInputEnvelope
    set?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    disconnect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    delete?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    update?: CadenceStageUpdateWithWhereUniqueWithoutCadenceInput | CadenceStageUpdateWithWhereUniqueWithoutCadenceInput[]
    updateMany?: CadenceStageUpdateManyWithWhereWithoutCadenceInput | CadenceStageUpdateManyWithWhereWithoutCadenceInput[]
    deleteMany?: CadenceStageScalarWhereInput | CadenceStageScalarWhereInput[]
  }

  export type LeadCadenceProgressUpdateManyWithoutCadenceNestedInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutCadenceInput, LeadCadenceProgressUncheckedCreateWithoutCadenceInput> | LeadCadenceProgressCreateWithoutCadenceInput[] | LeadCadenceProgressUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutCadenceInput | LeadCadenceProgressCreateOrConnectWithoutCadenceInput[]
    upsert?: LeadCadenceProgressUpsertWithWhereUniqueWithoutCadenceInput | LeadCadenceProgressUpsertWithWhereUniqueWithoutCadenceInput[]
    createMany?: LeadCadenceProgressCreateManyCadenceInputEnvelope
    set?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    disconnect?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    delete?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    connect?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    update?: LeadCadenceProgressUpdateWithWhereUniqueWithoutCadenceInput | LeadCadenceProgressUpdateWithWhereUniqueWithoutCadenceInput[]
    updateMany?: LeadCadenceProgressUpdateManyWithWhereWithoutCadenceInput | LeadCadenceProgressUpdateManyWithWhereWithoutCadenceInput[]
    deleteMany?: LeadCadenceProgressScalarWhereInput | LeadCadenceProgressScalarWhereInput[]
  }

  export type CadenceStageUncheckedUpdateManyWithoutCadenceNestedInput = {
    create?: XOR<CadenceStageCreateWithoutCadenceInput, CadenceStageUncheckedCreateWithoutCadenceInput> | CadenceStageCreateWithoutCadenceInput[] | CadenceStageUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutCadenceInput | CadenceStageCreateOrConnectWithoutCadenceInput[]
    upsert?: CadenceStageUpsertWithWhereUniqueWithoutCadenceInput | CadenceStageUpsertWithWhereUniqueWithoutCadenceInput[]
    createMany?: CadenceStageCreateManyCadenceInputEnvelope
    set?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    disconnect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    delete?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    update?: CadenceStageUpdateWithWhereUniqueWithoutCadenceInput | CadenceStageUpdateWithWhereUniqueWithoutCadenceInput[]
    updateMany?: CadenceStageUpdateManyWithWhereWithoutCadenceInput | CadenceStageUpdateManyWithWhereWithoutCadenceInput[]
    deleteMany?: CadenceStageScalarWhereInput | CadenceStageScalarWhereInput[]
  }

  export type LeadCadenceProgressUncheckedUpdateManyWithoutCadenceNestedInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutCadenceInput, LeadCadenceProgressUncheckedCreateWithoutCadenceInput> | LeadCadenceProgressCreateWithoutCadenceInput[] | LeadCadenceProgressUncheckedCreateWithoutCadenceInput[]
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutCadenceInput | LeadCadenceProgressCreateOrConnectWithoutCadenceInput[]
    upsert?: LeadCadenceProgressUpsertWithWhereUniqueWithoutCadenceInput | LeadCadenceProgressUpsertWithWhereUniqueWithoutCadenceInput[]
    createMany?: LeadCadenceProgressCreateManyCadenceInputEnvelope
    set?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    disconnect?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    delete?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    connect?: LeadCadenceProgressWhereUniqueInput | LeadCadenceProgressWhereUniqueInput[]
    update?: LeadCadenceProgressUpdateWithWhereUniqueWithoutCadenceInput | LeadCadenceProgressUpdateWithWhereUniqueWithoutCadenceInput[]
    updateMany?: LeadCadenceProgressUpdateManyWithWhereWithoutCadenceInput | LeadCadenceProgressUpdateManyWithWhereWithoutCadenceInput[]
    deleteMany?: LeadCadenceProgressScalarWhereInput | LeadCadenceProgressScalarWhereInput[]
  }

  export type CadenceEngineCreateNestedOneWithoutStagesInput = {
    create?: XOR<CadenceEngineCreateWithoutStagesInput, CadenceEngineUncheckedCreateWithoutStagesInput>
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutStagesInput
    connect?: CadenceEngineWhereUniqueInput
  }

  export type TemplateCreateNestedOneWithoutCadenceStagesInput = {
    create?: XOR<TemplateCreateWithoutCadenceStagesInput, TemplateUncheckedCreateWithoutCadenceStagesInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutCadenceStagesInput
    connect?: TemplateWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTemplateChannelFieldUpdateOperationsInput = {
    set?: $Enums.TemplateChannel
  }

  export type CadenceEngineUpdateOneRequiredWithoutStagesNestedInput = {
    create?: XOR<CadenceEngineCreateWithoutStagesInput, CadenceEngineUncheckedCreateWithoutStagesInput>
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutStagesInput
    upsert?: CadenceEngineUpsertWithoutStagesInput
    connect?: CadenceEngineWhereUniqueInput
    update?: XOR<XOR<CadenceEngineUpdateToOneWithWhereWithoutStagesInput, CadenceEngineUpdateWithoutStagesInput>, CadenceEngineUncheckedUpdateWithoutStagesInput>
  }

  export type TemplateUpdateOneWithoutCadenceStagesNestedInput = {
    create?: XOR<TemplateCreateWithoutCadenceStagesInput, TemplateUncheckedCreateWithoutCadenceStagesInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutCadenceStagesInput
    upsert?: TemplateUpsertWithoutCadenceStagesInput
    disconnect?: TemplateWhereInput | boolean
    delete?: TemplateWhereInput | boolean
    connect?: TemplateWhereUniqueInput
    update?: XOR<XOR<TemplateUpdateToOneWithWhereWithoutCadenceStagesInput, TemplateUpdateWithoutCadenceStagesInput>, TemplateUncheckedUpdateWithoutCadenceStagesInput>
  }

  export type LeadCreateNestedOneWithoutCadenceEngineInput = {
    create?: XOR<LeadCreateWithoutCadenceEngineInput, LeadUncheckedCreateWithoutCadenceEngineInput>
    connectOrCreate?: LeadCreateOrConnectWithoutCadenceEngineInput
    connect?: LeadWhereUniqueInput
  }

  export type CadenceEngineCreateNestedOneWithoutProgressionsInput = {
    create?: XOR<CadenceEngineCreateWithoutProgressionsInput, CadenceEngineUncheckedCreateWithoutProgressionsInput>
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutProgressionsInput
    connect?: CadenceEngineWhereUniqueInput
  }

  export type LeadCadenceEventCreateNestedManyWithoutProgressionInput = {
    create?: XOR<LeadCadenceEventCreateWithoutProgressionInput, LeadCadenceEventUncheckedCreateWithoutProgressionInput> | LeadCadenceEventCreateWithoutProgressionInput[] | LeadCadenceEventUncheckedCreateWithoutProgressionInput[]
    connectOrCreate?: LeadCadenceEventCreateOrConnectWithoutProgressionInput | LeadCadenceEventCreateOrConnectWithoutProgressionInput[]
    createMany?: LeadCadenceEventCreateManyProgressionInputEnvelope
    connect?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
  }

  export type LeadCadenceEventUncheckedCreateNestedManyWithoutProgressionInput = {
    create?: XOR<LeadCadenceEventCreateWithoutProgressionInput, LeadCadenceEventUncheckedCreateWithoutProgressionInput> | LeadCadenceEventCreateWithoutProgressionInput[] | LeadCadenceEventUncheckedCreateWithoutProgressionInput[]
    connectOrCreate?: LeadCadenceEventCreateOrConnectWithoutProgressionInput | LeadCadenceEventCreateOrConnectWithoutProgressionInput[]
    createMany?: LeadCadenceEventCreateManyProgressionInputEnvelope
    connect?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCadenceStatusFieldUpdateOperationsInput = {
    set?: $Enums.CadenceStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LeadUpdateOneRequiredWithoutCadenceEngineNestedInput = {
    create?: XOR<LeadCreateWithoutCadenceEngineInput, LeadUncheckedCreateWithoutCadenceEngineInput>
    connectOrCreate?: LeadCreateOrConnectWithoutCadenceEngineInput
    upsert?: LeadUpsertWithoutCadenceEngineInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutCadenceEngineInput, LeadUpdateWithoutCadenceEngineInput>, LeadUncheckedUpdateWithoutCadenceEngineInput>
  }

  export type CadenceEngineUpdateOneRequiredWithoutProgressionsNestedInput = {
    create?: XOR<CadenceEngineCreateWithoutProgressionsInput, CadenceEngineUncheckedCreateWithoutProgressionsInput>
    connectOrCreate?: CadenceEngineCreateOrConnectWithoutProgressionsInput
    upsert?: CadenceEngineUpsertWithoutProgressionsInput
    connect?: CadenceEngineWhereUniqueInput
    update?: XOR<XOR<CadenceEngineUpdateToOneWithWhereWithoutProgressionsInput, CadenceEngineUpdateWithoutProgressionsInput>, CadenceEngineUncheckedUpdateWithoutProgressionsInput>
  }

  export type LeadCadenceEventUpdateManyWithoutProgressionNestedInput = {
    create?: XOR<LeadCadenceEventCreateWithoutProgressionInput, LeadCadenceEventUncheckedCreateWithoutProgressionInput> | LeadCadenceEventCreateWithoutProgressionInput[] | LeadCadenceEventUncheckedCreateWithoutProgressionInput[]
    connectOrCreate?: LeadCadenceEventCreateOrConnectWithoutProgressionInput | LeadCadenceEventCreateOrConnectWithoutProgressionInput[]
    upsert?: LeadCadenceEventUpsertWithWhereUniqueWithoutProgressionInput | LeadCadenceEventUpsertWithWhereUniqueWithoutProgressionInput[]
    createMany?: LeadCadenceEventCreateManyProgressionInputEnvelope
    set?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    disconnect?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    delete?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    connect?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    update?: LeadCadenceEventUpdateWithWhereUniqueWithoutProgressionInput | LeadCadenceEventUpdateWithWhereUniqueWithoutProgressionInput[]
    updateMany?: LeadCadenceEventUpdateManyWithWhereWithoutProgressionInput | LeadCadenceEventUpdateManyWithWhereWithoutProgressionInput[]
    deleteMany?: LeadCadenceEventScalarWhereInput | LeadCadenceEventScalarWhereInput[]
  }

  export type LeadCadenceEventUncheckedUpdateManyWithoutProgressionNestedInput = {
    create?: XOR<LeadCadenceEventCreateWithoutProgressionInput, LeadCadenceEventUncheckedCreateWithoutProgressionInput> | LeadCadenceEventCreateWithoutProgressionInput[] | LeadCadenceEventUncheckedCreateWithoutProgressionInput[]
    connectOrCreate?: LeadCadenceEventCreateOrConnectWithoutProgressionInput | LeadCadenceEventCreateOrConnectWithoutProgressionInput[]
    upsert?: LeadCadenceEventUpsertWithWhereUniqueWithoutProgressionInput | LeadCadenceEventUpsertWithWhereUniqueWithoutProgressionInput[]
    createMany?: LeadCadenceEventCreateManyProgressionInputEnvelope
    set?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    disconnect?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    delete?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    connect?: LeadCadenceEventWhereUniqueInput | LeadCadenceEventWhereUniqueInput[]
    update?: LeadCadenceEventUpdateWithWhereUniqueWithoutProgressionInput | LeadCadenceEventUpdateWithWhereUniqueWithoutProgressionInput[]
    updateMany?: LeadCadenceEventUpdateManyWithWhereWithoutProgressionInput | LeadCadenceEventUpdateManyWithWhereWithoutProgressionInput[]
    deleteMany?: LeadCadenceEventScalarWhereInput | LeadCadenceEventScalarWhereInput[]
  }

  export type LeadCadenceProgressCreateNestedOneWithoutEventsInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutEventsInput, LeadCadenceProgressUncheckedCreateWithoutEventsInput>
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutEventsInput
    connect?: LeadCadenceProgressWhereUniqueInput
  }

  export type LeadCadenceProgressUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<LeadCadenceProgressCreateWithoutEventsInput, LeadCadenceProgressUncheckedCreateWithoutEventsInput>
    connectOrCreate?: LeadCadenceProgressCreateOrConnectWithoutEventsInput
    upsert?: LeadCadenceProgressUpsertWithoutEventsInput
    connect?: LeadCadenceProgressWhereUniqueInput
    update?: XOR<XOR<LeadCadenceProgressUpdateToOneWithWhereWithoutEventsInput, LeadCadenceProgressUpdateWithoutEventsInput>, LeadCadenceProgressUncheckedUpdateWithoutEventsInput>
  }

  export type ProfileCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<ProfileCreateWithoutTemplatesInput, ProfileUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTemplatesInput
    connect?: ProfileWhereUniqueInput
  }

  export type CadenceStageCreateNestedManyWithoutTemplateInput = {
    create?: XOR<CadenceStageCreateWithoutTemplateInput, CadenceStageUncheckedCreateWithoutTemplateInput> | CadenceStageCreateWithoutTemplateInput[] | CadenceStageUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutTemplateInput | CadenceStageCreateOrConnectWithoutTemplateInput[]
    createMany?: CadenceStageCreateManyTemplateInputEnvelope
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
  }

  export type CadenceStageUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<CadenceStageCreateWithoutTemplateInput, CadenceStageUncheckedCreateWithoutTemplateInput> | CadenceStageCreateWithoutTemplateInput[] | CadenceStageUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutTemplateInput | CadenceStageCreateOrConnectWithoutTemplateInput[]
    createMany?: CadenceStageCreateManyTemplateInputEnvelope
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
  }

  export type ProfileUpdateOneRequiredWithoutTemplatesNestedInput = {
    create?: XOR<ProfileCreateWithoutTemplatesInput, ProfileUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutTemplatesInput
    upsert?: ProfileUpsertWithoutTemplatesInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutTemplatesInput, ProfileUpdateWithoutTemplatesInput>, ProfileUncheckedUpdateWithoutTemplatesInput>
  }

  export type CadenceStageUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<CadenceStageCreateWithoutTemplateInput, CadenceStageUncheckedCreateWithoutTemplateInput> | CadenceStageCreateWithoutTemplateInput[] | CadenceStageUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutTemplateInput | CadenceStageCreateOrConnectWithoutTemplateInput[]
    upsert?: CadenceStageUpsertWithWhereUniqueWithoutTemplateInput | CadenceStageUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: CadenceStageCreateManyTemplateInputEnvelope
    set?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    disconnect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    delete?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    update?: CadenceStageUpdateWithWhereUniqueWithoutTemplateInput | CadenceStageUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: CadenceStageUpdateManyWithWhereWithoutTemplateInput | CadenceStageUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: CadenceStageScalarWhereInput | CadenceStageScalarWhereInput[]
  }

  export type CadenceStageUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<CadenceStageCreateWithoutTemplateInput, CadenceStageUncheckedCreateWithoutTemplateInput> | CadenceStageCreateWithoutTemplateInput[] | CadenceStageUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: CadenceStageCreateOrConnectWithoutTemplateInput | CadenceStageCreateOrConnectWithoutTemplateInput[]
    upsert?: CadenceStageUpsertWithWhereUniqueWithoutTemplateInput | CadenceStageUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: CadenceStageCreateManyTemplateInputEnvelope
    set?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    disconnect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    delete?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    connect?: CadenceStageWhereUniqueInput | CadenceStageWhereUniqueInput[]
    update?: CadenceStageUpdateWithWhereUniqueWithoutTemplateInput | CadenceStageUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: CadenceStageUpdateManyWithWhereWithoutTemplateInput | CadenceStageUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: CadenceStageScalarWhereInput | CadenceStageScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutHistoriesInput = {
    create?: XOR<LeadCreateWithoutHistoriesInput, LeadUncheckedCreateWithoutHistoriesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutHistoriesInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutHistoriesNestedInput = {
    create?: XOR<LeadCreateWithoutHistoriesInput, LeadUncheckedCreateWithoutHistoriesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutHistoriesInput
    upsert?: LeadUpsertWithoutHistoriesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutHistoriesInput, LeadUpdateWithoutHistoriesInput>, LeadUncheckedUpdateWithoutHistoriesInput>
  }

  export type ProfileCreateNestedOneWithoutOperatorsInput = {
    create?: XOR<ProfileCreateWithoutOperatorsInput, ProfileUncheckedCreateWithoutOperatorsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutOperatorsInput
    connect?: ProfileWhereUniqueInput
  }

  export type LeadCreateNestedManyWithoutLastOperatorInput = {
    create?: XOR<LeadCreateWithoutLastOperatorInput, LeadUncheckedCreateWithoutLastOperatorInput> | LeadCreateWithoutLastOperatorInput[] | LeadUncheckedCreateWithoutLastOperatorInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutLastOperatorInput | LeadCreateOrConnectWithoutLastOperatorInput[]
    createMany?: LeadCreateManyLastOperatorInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadNoteCreateNestedManyWithoutOperatorInput = {
    create?: XOR<LeadNoteCreateWithoutOperatorInput, LeadNoteUncheckedCreateWithoutOperatorInput> | LeadNoteCreateWithoutOperatorInput[] | LeadNoteUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutOperatorInput | LeadNoteCreateOrConnectWithoutOperatorInput[]
    createMany?: LeadNoteCreateManyOperatorInputEnvelope
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
  }

  export type LeadUncheckedCreateNestedManyWithoutLastOperatorInput = {
    create?: XOR<LeadCreateWithoutLastOperatorInput, LeadUncheckedCreateWithoutLastOperatorInput> | LeadCreateWithoutLastOperatorInput[] | LeadUncheckedCreateWithoutLastOperatorInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutLastOperatorInput | LeadCreateOrConnectWithoutLastOperatorInput[]
    createMany?: LeadCreateManyLastOperatorInputEnvelope
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
  }

  export type LeadNoteUncheckedCreateNestedManyWithoutOperatorInput = {
    create?: XOR<LeadNoteCreateWithoutOperatorInput, LeadNoteUncheckedCreateWithoutOperatorInput> | LeadNoteCreateWithoutOperatorInput[] | LeadNoteUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutOperatorInput | LeadNoteCreateOrConnectWithoutOperatorInput[]
    createMany?: LeadNoteCreateManyOperatorInputEnvelope
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
  }

  export type ProfileUpdateOneRequiredWithoutOperatorsNestedInput = {
    create?: XOR<ProfileCreateWithoutOperatorsInput, ProfileUncheckedCreateWithoutOperatorsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutOperatorsInput
    upsert?: ProfileUpsertWithoutOperatorsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutOperatorsInput, ProfileUpdateWithoutOperatorsInput>, ProfileUncheckedUpdateWithoutOperatorsInput>
  }

  export type LeadUpdateManyWithoutLastOperatorNestedInput = {
    create?: XOR<LeadCreateWithoutLastOperatorInput, LeadUncheckedCreateWithoutLastOperatorInput> | LeadCreateWithoutLastOperatorInput[] | LeadUncheckedCreateWithoutLastOperatorInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutLastOperatorInput | LeadCreateOrConnectWithoutLastOperatorInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutLastOperatorInput | LeadUpsertWithWhereUniqueWithoutLastOperatorInput[]
    createMany?: LeadCreateManyLastOperatorInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutLastOperatorInput | LeadUpdateWithWhereUniqueWithoutLastOperatorInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutLastOperatorInput | LeadUpdateManyWithWhereWithoutLastOperatorInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadNoteUpdateManyWithoutOperatorNestedInput = {
    create?: XOR<LeadNoteCreateWithoutOperatorInput, LeadNoteUncheckedCreateWithoutOperatorInput> | LeadNoteCreateWithoutOperatorInput[] | LeadNoteUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutOperatorInput | LeadNoteCreateOrConnectWithoutOperatorInput[]
    upsert?: LeadNoteUpsertWithWhereUniqueWithoutOperatorInput | LeadNoteUpsertWithWhereUniqueWithoutOperatorInput[]
    createMany?: LeadNoteCreateManyOperatorInputEnvelope
    set?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    disconnect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    delete?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    update?: LeadNoteUpdateWithWhereUniqueWithoutOperatorInput | LeadNoteUpdateWithWhereUniqueWithoutOperatorInput[]
    updateMany?: LeadNoteUpdateManyWithWhereWithoutOperatorInput | LeadNoteUpdateManyWithWhereWithoutOperatorInput[]
    deleteMany?: LeadNoteScalarWhereInput | LeadNoteScalarWhereInput[]
  }

  export type LeadUncheckedUpdateManyWithoutLastOperatorNestedInput = {
    create?: XOR<LeadCreateWithoutLastOperatorInput, LeadUncheckedCreateWithoutLastOperatorInput> | LeadCreateWithoutLastOperatorInput[] | LeadUncheckedCreateWithoutLastOperatorInput[]
    connectOrCreate?: LeadCreateOrConnectWithoutLastOperatorInput | LeadCreateOrConnectWithoutLastOperatorInput[]
    upsert?: LeadUpsertWithWhereUniqueWithoutLastOperatorInput | LeadUpsertWithWhereUniqueWithoutLastOperatorInput[]
    createMany?: LeadCreateManyLastOperatorInputEnvelope
    set?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    disconnect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    delete?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    connect?: LeadWhereUniqueInput | LeadWhereUniqueInput[]
    update?: LeadUpdateWithWhereUniqueWithoutLastOperatorInput | LeadUpdateWithWhereUniqueWithoutLastOperatorInput[]
    updateMany?: LeadUpdateManyWithWhereWithoutLastOperatorInput | LeadUpdateManyWithWhereWithoutLastOperatorInput[]
    deleteMany?: LeadScalarWhereInput | LeadScalarWhereInput[]
  }

  export type LeadNoteUncheckedUpdateManyWithoutOperatorNestedInput = {
    create?: XOR<LeadNoteCreateWithoutOperatorInput, LeadNoteUncheckedCreateWithoutOperatorInput> | LeadNoteCreateWithoutOperatorInput[] | LeadNoteUncheckedCreateWithoutOperatorInput[]
    connectOrCreate?: LeadNoteCreateOrConnectWithoutOperatorInput | LeadNoteCreateOrConnectWithoutOperatorInput[]
    upsert?: LeadNoteUpsertWithWhereUniqueWithoutOperatorInput | LeadNoteUpsertWithWhereUniqueWithoutOperatorInput[]
    createMany?: LeadNoteCreateManyOperatorInputEnvelope
    set?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    disconnect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    delete?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    connect?: LeadNoteWhereUniqueInput | LeadNoteWhereUniqueInput[]
    update?: LeadNoteUpdateWithWhereUniqueWithoutOperatorInput | LeadNoteUpdateWithWhereUniqueWithoutOperatorInput[]
    updateMany?: LeadNoteUpdateManyWithWhereWithoutOperatorInput | LeadNoteUpdateManyWithWhereWithoutOperatorInput[]
    deleteMany?: LeadNoteScalarWhereInput | LeadNoteScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutLeadNotesInput = {
    create?: XOR<LeadCreateWithoutLeadNotesInput, LeadUncheckedCreateWithoutLeadNotesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutLeadNotesInput
    connect?: LeadWhereUniqueInput
  }

  export type OperatorCreateNestedOneWithoutLeadNotesInput = {
    create?: XOR<OperatorCreateWithoutLeadNotesInput, OperatorUncheckedCreateWithoutLeadNotesInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutLeadNotesInput
    connect?: OperatorWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutLeadNotesNestedInput = {
    create?: XOR<LeadCreateWithoutLeadNotesInput, LeadUncheckedCreateWithoutLeadNotesInput>
    connectOrCreate?: LeadCreateOrConnectWithoutLeadNotesInput
    upsert?: LeadUpsertWithoutLeadNotesInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutLeadNotesInput, LeadUpdateWithoutLeadNotesInput>, LeadUncheckedUpdateWithoutLeadNotesInput>
  }

  export type OperatorUpdateOneWithoutLeadNotesNestedInput = {
    create?: XOR<OperatorCreateWithoutLeadNotesInput, OperatorUncheckedCreateWithoutLeadNotesInput>
    connectOrCreate?: OperatorCreateOrConnectWithoutLeadNotesInput
    upsert?: OperatorUpsertWithoutLeadNotesInput
    disconnect?: OperatorWhereInput | boolean
    delete?: OperatorWhereInput | boolean
    connect?: OperatorWhereUniqueInput
    update?: XOR<XOR<OperatorUpdateToOneWithWhereWithoutLeadNotesInput, OperatorUpdateWithoutLeadNotesInput>, OperatorUncheckedUpdateWithoutLeadNotesInput>
  }

  export type ProfileCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutNotificationsInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutNotificationsInput
    upsert?: ProfileUpsertWithoutNotificationsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutNotificationsInput, ProfileUpdateWithoutNotificationsInput>, ProfileUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus
  }

  export type NestedEnumLeadSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel>
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadSourceFilter<$PrismaModel> | $Enums.LeadSource
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | EnumLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadStatus[] | ListEnumLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadStatusFilter<$PrismaModel>
    _max?: NestedEnumLeadStatusFilter<$PrismaModel>
  }

  export type NestedEnumLeadSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadSource | EnumLeadSourceFieldRefInput<$PrismaModel>
    in?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeadSource[] | ListEnumLeadSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumLeadSourceWithAggregatesFilter<$PrismaModel> | $Enums.LeadSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeadSourceFilter<$PrismaModel>
    _max?: NestedEnumLeadSourceFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumTemplateChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateChannel | EnumTemplateChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateChannelFilter<$PrismaModel> | $Enums.TemplateChannel
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTemplateChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TemplateChannel | EnumTemplateChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemplateChannel[] | ListEnumTemplateChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTemplateChannelWithAggregatesFilter<$PrismaModel> | $Enums.TemplateChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTemplateChannelFilter<$PrismaModel>
    _max?: NestedEnumTemplateChannelFilter<$PrismaModel>
  }

  export type NestedEnumCadenceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CadenceStatus | EnumCadenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCadenceStatusFilter<$PrismaModel> | $Enums.CadenceStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCadenceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CadenceStatus | EnumCadenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CadenceStatus[] | ListEnumCadenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCadenceStatusWithAggregatesFilter<$PrismaModel> | $Enums.CadenceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCadenceStatusFilter<$PrismaModel>
    _max?: NestedEnumCadenceStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LeadCreateWithoutProfileInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastOperator?: OperatorCreateNestedOneWithoutLeadsInput
    histories?: LeadHistoryCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutProfileInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    histories?: LeadHistoryUncheckedCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressUncheckedCreateNestedOneWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutProfileInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutProfileInput, LeadUncheckedCreateWithoutProfileInput>
  }

  export type LeadCreateManyProfileInputEnvelope = {
    data: LeadCreateManyProfileInput | LeadCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type TemplateCreateWithoutProfileInput = {
    id?: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cadenceStages?: CadenceStageCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cadenceStages?: CadenceStageUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateCreateOrConnectWithoutProfileInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutProfileInput, TemplateUncheckedCreateWithoutProfileInput>
  }

  export type TemplateCreateManyProfileInputEnvelope = {
    data: TemplateCreateManyProfileInput | TemplateCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type OperatorCreateWithoutProfileInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutLastOperatorInput
    leadNotes?: LeadNoteCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutLastOperatorInput
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutOperatorInput
  }

  export type OperatorCreateOrConnectWithoutProfileInput = {
    where: OperatorWhereUniqueInput
    create: XOR<OperatorCreateWithoutProfileInput, OperatorUncheckedCreateWithoutProfileInput>
  }

  export type OperatorCreateManyProfileInputEnvelope = {
    data: OperatorCreateManyProfileInput | OperatorCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type CadenceEngineCreateWithoutProfileInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: CadenceStageCreateNestedManyWithoutCadenceInput
    progressions?: LeadCadenceProgressCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: CadenceStageUncheckedCreateNestedManyWithoutCadenceInput
    progressions?: LeadCadenceProgressUncheckedCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineCreateOrConnectWithoutProfileInput = {
    where: CadenceEngineWhereUniqueInput
    create: XOR<CadenceEngineCreateWithoutProfileInput, CadenceEngineUncheckedCreateWithoutProfileInput>
  }

  export type CadenceEngineCreateManyProfileInputEnvelope = {
    data: CadenceEngineCreateManyProfileInput | CadenceEngineCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutProfileInput = {
    id?: string
    leadId?: string | null
    title: string
    message: string
    isRead?: boolean
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutProfileInput = {
    id?: string
    leadId?: string | null
    title: string
    message: string
    isRead?: boolean
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutProfileInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutProfileInput, NotificationUncheckedCreateWithoutProfileInput>
  }

  export type NotificationCreateManyProfileInputEnvelope = {
    data: NotificationCreateManyProfileInput | NotificationCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type LeadUpsertWithWhereUniqueWithoutProfileInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutProfileInput, LeadUncheckedUpdateWithoutProfileInput>
    create: XOR<LeadCreateWithoutProfileInput, LeadUncheckedCreateWithoutProfileInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutProfileInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutProfileInput, LeadUncheckedUpdateWithoutProfileInput>
  }

  export type LeadUpdateManyWithWhereWithoutProfileInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutProfileInput>
  }

  export type LeadScalarWhereInput = {
    AND?: LeadScalarWhereInput | LeadScalarWhereInput[]
    OR?: LeadScalarWhereInput[]
    NOT?: LeadScalarWhereInput | LeadScalarWhereInput[]
    id?: StringFilter<"Lead"> | string
    profileId?: StringFilter<"Lead"> | string
    code?: StringFilter<"Lead"> | string
    fullName?: StringFilter<"Lead"> | string
    company?: StringNullableFilter<"Lead"> | string | null
    jobTitle?: StringNullableFilter<"Lead"> | string | null
    email?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    linkedinUrl?: StringNullableFilter<"Lead"> | string | null
    whatsappUrl?: StringNullableFilter<"Lead"> | string | null
    status?: EnumLeadStatusFilter<"Lead"> | $Enums.LeadStatus
    source?: EnumLeadSourceFilter<"Lead"> | $Enums.LeadSource
    notes?: StringNullableFilter<"Lead"> | string | null
    importBatchId?: StringNullableFilter<"Lead"> | string | null
    customSource?: StringNullableFilter<"Lead"> | string | null
    lastOperatorId?: StringNullableFilter<"Lead"> | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
  }

  export type TemplateUpsertWithWhereUniqueWithoutProfileInput = {
    where: TemplateWhereUniqueInput
    update: XOR<TemplateUpdateWithoutProfileInput, TemplateUncheckedUpdateWithoutProfileInput>
    create: XOR<TemplateCreateWithoutProfileInput, TemplateUncheckedCreateWithoutProfileInput>
  }

  export type TemplateUpdateWithWhereUniqueWithoutProfileInput = {
    where: TemplateWhereUniqueInput
    data: XOR<TemplateUpdateWithoutProfileInput, TemplateUncheckedUpdateWithoutProfileInput>
  }

  export type TemplateUpdateManyWithWhereWithoutProfileInput = {
    where: TemplateScalarWhereInput
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyWithoutProfileInput>
  }

  export type TemplateScalarWhereInput = {
    AND?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
    OR?: TemplateScalarWhereInput[]
    NOT?: TemplateScalarWhereInput | TemplateScalarWhereInput[]
    id?: StringFilter<"Template"> | string
    profileId?: StringFilter<"Template"> | string
    name?: StringFilter<"Template"> | string
    channel?: EnumTemplateChannelFilter<"Template"> | $Enums.TemplateChannel
    subject?: StringNullableFilter<"Template"> | string | null
    body?: StringFilter<"Template"> | string
    isActive?: BoolFilter<"Template"> | boolean
    createdAt?: DateTimeFilter<"Template"> | Date | string
    updatedAt?: DateTimeFilter<"Template"> | Date | string
  }

  export type OperatorUpsertWithWhereUniqueWithoutProfileInput = {
    where: OperatorWhereUniqueInput
    update: XOR<OperatorUpdateWithoutProfileInput, OperatorUncheckedUpdateWithoutProfileInput>
    create: XOR<OperatorCreateWithoutProfileInput, OperatorUncheckedCreateWithoutProfileInput>
  }

  export type OperatorUpdateWithWhereUniqueWithoutProfileInput = {
    where: OperatorWhereUniqueInput
    data: XOR<OperatorUpdateWithoutProfileInput, OperatorUncheckedUpdateWithoutProfileInput>
  }

  export type OperatorUpdateManyWithWhereWithoutProfileInput = {
    where: OperatorScalarWhereInput
    data: XOR<OperatorUpdateManyMutationInput, OperatorUncheckedUpdateManyWithoutProfileInput>
  }

  export type OperatorScalarWhereInput = {
    AND?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
    OR?: OperatorScalarWhereInput[]
    NOT?: OperatorScalarWhereInput | OperatorScalarWhereInput[]
    id?: StringFilter<"Operator"> | string
    profileId?: StringFilter<"Operator"> | string
    name?: StringFilter<"Operator"> | string
    isActive?: BoolFilter<"Operator"> | boolean
    createdAt?: DateTimeFilter<"Operator"> | Date | string
    updatedAt?: DateTimeFilter<"Operator"> | Date | string
  }

  export type CadenceEngineUpsertWithWhereUniqueWithoutProfileInput = {
    where: CadenceEngineWhereUniqueInput
    update: XOR<CadenceEngineUpdateWithoutProfileInput, CadenceEngineUncheckedUpdateWithoutProfileInput>
    create: XOR<CadenceEngineCreateWithoutProfileInput, CadenceEngineUncheckedCreateWithoutProfileInput>
  }

  export type CadenceEngineUpdateWithWhereUniqueWithoutProfileInput = {
    where: CadenceEngineWhereUniqueInput
    data: XOR<CadenceEngineUpdateWithoutProfileInput, CadenceEngineUncheckedUpdateWithoutProfileInput>
  }

  export type CadenceEngineUpdateManyWithWhereWithoutProfileInput = {
    where: CadenceEngineScalarWhereInput
    data: XOR<CadenceEngineUpdateManyMutationInput, CadenceEngineUncheckedUpdateManyWithoutProfileInput>
  }

  export type CadenceEngineScalarWhereInput = {
    AND?: CadenceEngineScalarWhereInput | CadenceEngineScalarWhereInput[]
    OR?: CadenceEngineScalarWhereInput[]
    NOT?: CadenceEngineScalarWhereInput | CadenceEngineScalarWhereInput[]
    id?: StringFilter<"CadenceEngine"> | string
    profileId?: StringNullableFilter<"CadenceEngine"> | string | null
    name?: StringFilter<"CadenceEngine"> | string
    description?: StringNullableFilter<"CadenceEngine"> | string | null
    isActive?: BoolFilter<"CadenceEngine"> | boolean
    createdAt?: DateTimeFilter<"CadenceEngine"> | Date | string
    updatedAt?: DateTimeFilter<"CadenceEngine"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutProfileInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutProfileInput, NotificationUncheckedUpdateWithoutProfileInput>
    create: XOR<NotificationCreateWithoutProfileInput, NotificationUncheckedCreateWithoutProfileInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutProfileInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutProfileInput, NotificationUncheckedUpdateWithoutProfileInput>
  }

  export type NotificationUpdateManyWithWhereWithoutProfileInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutProfileInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    profileId?: StringFilter<"Notification"> | string
    leadId?: StringNullableFilter<"Notification"> | string | null
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    metadata?: JsonNullableFilter<"Notification">
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type ProfileCreateWithoutLeadsInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    templates?: TemplateCreateNestedManyWithoutProfileInput
    operators?: OperatorCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineCreateNestedManyWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutLeadsInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    templates?: TemplateUncheckedCreateNestedManyWithoutProfileInput
    operators?: OperatorUncheckedCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineUncheckedCreateNestedManyWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutLeadsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutLeadsInput, ProfileUncheckedCreateWithoutLeadsInput>
  }

  export type OperatorCreateWithoutLeadsInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutOperatorsInput
    leadNotes?: LeadNoteCreateNestedManyWithoutOperatorInput
  }

  export type OperatorUncheckedCreateWithoutLeadsInput = {
    id?: string
    profileId: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutOperatorInput
  }

  export type OperatorCreateOrConnectWithoutLeadsInput = {
    where: OperatorWhereUniqueInput
    create: XOR<OperatorCreateWithoutLeadsInput, OperatorUncheckedCreateWithoutLeadsInput>
  }

  export type LeadHistoryCreateWithoutLeadInput = {
    id?: string
    previousData: JsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    actionBy?: string | null
    createdAt?: Date | string
  }

  export type LeadHistoryUncheckedCreateWithoutLeadInput = {
    id?: string
    previousData: JsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    actionBy?: string | null
    createdAt?: Date | string
  }

  export type LeadHistoryCreateOrConnectWithoutLeadInput = {
    where: LeadHistoryWhereUniqueInput
    create: XOR<LeadHistoryCreateWithoutLeadInput, LeadHistoryUncheckedCreateWithoutLeadInput>
  }

  export type LeadHistoryCreateManyLeadInputEnvelope = {
    data: LeadHistoryCreateManyLeadInput | LeadHistoryCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type LeadNoteCreateWithoutLeadInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operator?: OperatorCreateNestedOneWithoutLeadNotesInput
  }

  export type LeadNoteUncheckedCreateWithoutLeadInput = {
    id?: string
    operatorId?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadNoteCreateOrConnectWithoutLeadInput = {
    where: LeadNoteWhereUniqueInput
    create: XOR<LeadNoteCreateWithoutLeadInput, LeadNoteUncheckedCreateWithoutLeadInput>
  }

  export type LeadNoteCreateManyLeadInputEnvelope = {
    data: LeadNoteCreateManyLeadInput | LeadNoteCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type LeadCadenceProgressCreateWithoutLeadInput = {
    id?: string
    profileId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    cadence: CadenceEngineCreateNestedOneWithoutProgressionsInput
    events?: LeadCadenceEventCreateNestedManyWithoutProgressionInput
  }

  export type LeadCadenceProgressUncheckedCreateWithoutLeadInput = {
    id?: string
    profileId: string
    cadenceId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    events?: LeadCadenceEventUncheckedCreateNestedManyWithoutProgressionInput
  }

  export type LeadCadenceProgressCreateOrConnectWithoutLeadInput = {
    where: LeadCadenceProgressWhereUniqueInput
    create: XOR<LeadCadenceProgressCreateWithoutLeadInput, LeadCadenceProgressUncheckedCreateWithoutLeadInput>
  }

  export type ProfileUpsertWithoutLeadsInput = {
    update: XOR<ProfileUpdateWithoutLeadsInput, ProfileUncheckedUpdateWithoutLeadsInput>
    create: XOR<ProfileCreateWithoutLeadsInput, ProfileUncheckedCreateWithoutLeadsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutLeadsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutLeadsInput, ProfileUncheckedUpdateWithoutLeadsInput>
  }

  export type ProfileUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: TemplateUpdateManyWithoutProfileNestedInput
    operators?: OperatorUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: TemplateUncheckedUpdateManyWithoutProfileNestedInput
    operators?: OperatorUncheckedUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUncheckedUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type OperatorUpsertWithoutLeadsInput = {
    update: XOR<OperatorUpdateWithoutLeadsInput, OperatorUncheckedUpdateWithoutLeadsInput>
    create: XOR<OperatorCreateWithoutLeadsInput, OperatorUncheckedCreateWithoutLeadsInput>
    where?: OperatorWhereInput
  }

  export type OperatorUpdateToOneWithWhereWithoutLeadsInput = {
    where?: OperatorWhereInput
    data: XOR<OperatorUpdateWithoutLeadsInput, OperatorUncheckedUpdateWithoutLeadsInput>
  }

  export type OperatorUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutOperatorsNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateWithoutLeadsInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutOperatorNestedInput
  }

  export type LeadHistoryUpsertWithWhereUniqueWithoutLeadInput = {
    where: LeadHistoryWhereUniqueInput
    update: XOR<LeadHistoryUpdateWithoutLeadInput, LeadHistoryUncheckedUpdateWithoutLeadInput>
    create: XOR<LeadHistoryCreateWithoutLeadInput, LeadHistoryUncheckedCreateWithoutLeadInput>
  }

  export type LeadHistoryUpdateWithWhereUniqueWithoutLeadInput = {
    where: LeadHistoryWhereUniqueInput
    data: XOR<LeadHistoryUpdateWithoutLeadInput, LeadHistoryUncheckedUpdateWithoutLeadInput>
  }

  export type LeadHistoryUpdateManyWithWhereWithoutLeadInput = {
    where: LeadHistoryScalarWhereInput
    data: XOR<LeadHistoryUpdateManyMutationInput, LeadHistoryUncheckedUpdateManyWithoutLeadInput>
  }

  export type LeadHistoryScalarWhereInput = {
    AND?: LeadHistoryScalarWhereInput | LeadHistoryScalarWhereInput[]
    OR?: LeadHistoryScalarWhereInput[]
    NOT?: LeadHistoryScalarWhereInput | LeadHistoryScalarWhereInput[]
    id?: StringFilter<"LeadHistory"> | string
    leadId?: StringFilter<"LeadHistory"> | string
    previousData?: JsonFilter<"LeadHistory">
    newData?: JsonFilter<"LeadHistory">
    actionBy?: StringNullableFilter<"LeadHistory"> | string | null
    createdAt?: DateTimeFilter<"LeadHistory"> | Date | string
  }

  export type LeadNoteUpsertWithWhereUniqueWithoutLeadInput = {
    where: LeadNoteWhereUniqueInput
    update: XOR<LeadNoteUpdateWithoutLeadInput, LeadNoteUncheckedUpdateWithoutLeadInput>
    create: XOR<LeadNoteCreateWithoutLeadInput, LeadNoteUncheckedCreateWithoutLeadInput>
  }

  export type LeadNoteUpdateWithWhereUniqueWithoutLeadInput = {
    where: LeadNoteWhereUniqueInput
    data: XOR<LeadNoteUpdateWithoutLeadInput, LeadNoteUncheckedUpdateWithoutLeadInput>
  }

  export type LeadNoteUpdateManyWithWhereWithoutLeadInput = {
    where: LeadNoteScalarWhereInput
    data: XOR<LeadNoteUpdateManyMutationInput, LeadNoteUncheckedUpdateManyWithoutLeadInput>
  }

  export type LeadNoteScalarWhereInput = {
    AND?: LeadNoteScalarWhereInput | LeadNoteScalarWhereInput[]
    OR?: LeadNoteScalarWhereInput[]
    NOT?: LeadNoteScalarWhereInput | LeadNoteScalarWhereInput[]
    id?: StringFilter<"LeadNote"> | string
    leadId?: StringFilter<"LeadNote"> | string
    operatorId?: StringNullableFilter<"LeadNote"> | string | null
    content?: StringFilter<"LeadNote"> | string
    createdAt?: DateTimeFilter<"LeadNote"> | Date | string
    updatedAt?: DateTimeFilter<"LeadNote"> | Date | string
  }

  export type LeadCadenceProgressUpsertWithoutLeadInput = {
    update: XOR<LeadCadenceProgressUpdateWithoutLeadInput, LeadCadenceProgressUncheckedUpdateWithoutLeadInput>
    create: XOR<LeadCadenceProgressCreateWithoutLeadInput, LeadCadenceProgressUncheckedCreateWithoutLeadInput>
    where?: LeadCadenceProgressWhereInput
  }

  export type LeadCadenceProgressUpdateToOneWithWhereWithoutLeadInput = {
    where?: LeadCadenceProgressWhereInput
    data: XOR<LeadCadenceProgressUpdateWithoutLeadInput, LeadCadenceProgressUncheckedUpdateWithoutLeadInput>
  }

  export type LeadCadenceProgressUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cadence?: CadenceEngineUpdateOneRequiredWithoutProgressionsNestedInput
    events?: LeadCadenceEventUpdateManyWithoutProgressionNestedInput
  }

  export type LeadCadenceProgressUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    events?: LeadCadenceEventUncheckedUpdateManyWithoutProgressionNestedInput
  }

  export type ProfileCreateWithoutCadencesInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutProfileInput
    templates?: TemplateCreateNestedManyWithoutProfileInput
    operators?: OperatorCreateNestedManyWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutCadencesInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutProfileInput
    templates?: TemplateUncheckedCreateNestedManyWithoutProfileInput
    operators?: OperatorUncheckedCreateNestedManyWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutCadencesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutCadencesInput, ProfileUncheckedCreateWithoutCadencesInput>
  }

  export type CadenceStageCreateWithoutCadenceInput = {
    id?: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    createdAt?: Date | string
    updatedAt?: Date | string
    template?: TemplateCreateNestedOneWithoutCadenceStagesInput
  }

  export type CadenceStageUncheckedCreateWithoutCadenceInput = {
    id?: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceStageCreateOrConnectWithoutCadenceInput = {
    where: CadenceStageWhereUniqueInput
    create: XOR<CadenceStageCreateWithoutCadenceInput, CadenceStageUncheckedCreateWithoutCadenceInput>
  }

  export type CadenceStageCreateManyCadenceInputEnvelope = {
    data: CadenceStageCreateManyCadenceInput | CadenceStageCreateManyCadenceInput[]
    skipDuplicates?: boolean
  }

  export type LeadCadenceProgressCreateWithoutCadenceInput = {
    id?: string
    profileId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    lead: LeadCreateNestedOneWithoutCadenceEngineInput
    events?: LeadCadenceEventCreateNestedManyWithoutProgressionInput
  }

  export type LeadCadenceProgressUncheckedCreateWithoutCadenceInput = {
    id?: string
    profileId: string
    leadId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    events?: LeadCadenceEventUncheckedCreateNestedManyWithoutProgressionInput
  }

  export type LeadCadenceProgressCreateOrConnectWithoutCadenceInput = {
    where: LeadCadenceProgressWhereUniqueInput
    create: XOR<LeadCadenceProgressCreateWithoutCadenceInput, LeadCadenceProgressUncheckedCreateWithoutCadenceInput>
  }

  export type LeadCadenceProgressCreateManyCadenceInputEnvelope = {
    data: LeadCadenceProgressCreateManyCadenceInput | LeadCadenceProgressCreateManyCadenceInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutCadencesInput = {
    update: XOR<ProfileUpdateWithoutCadencesInput, ProfileUncheckedUpdateWithoutCadencesInput>
    create: XOR<ProfileCreateWithoutCadencesInput, ProfileUncheckedCreateWithoutCadencesInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutCadencesInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutCadencesInput, ProfileUncheckedUpdateWithoutCadencesInput>
  }

  export type ProfileUpdateWithoutCadencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutProfileNestedInput
    templates?: TemplateUpdateManyWithoutProfileNestedInput
    operators?: OperatorUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutCadencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutProfileNestedInput
    templates?: TemplateUncheckedUpdateManyWithoutProfileNestedInput
    operators?: OperatorUncheckedUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type CadenceStageUpsertWithWhereUniqueWithoutCadenceInput = {
    where: CadenceStageWhereUniqueInput
    update: XOR<CadenceStageUpdateWithoutCadenceInput, CadenceStageUncheckedUpdateWithoutCadenceInput>
    create: XOR<CadenceStageCreateWithoutCadenceInput, CadenceStageUncheckedCreateWithoutCadenceInput>
  }

  export type CadenceStageUpdateWithWhereUniqueWithoutCadenceInput = {
    where: CadenceStageWhereUniqueInput
    data: XOR<CadenceStageUpdateWithoutCadenceInput, CadenceStageUncheckedUpdateWithoutCadenceInput>
  }

  export type CadenceStageUpdateManyWithWhereWithoutCadenceInput = {
    where: CadenceStageScalarWhereInput
    data: XOR<CadenceStageUpdateManyMutationInput, CadenceStageUncheckedUpdateManyWithoutCadenceInput>
  }

  export type CadenceStageScalarWhereInput = {
    AND?: CadenceStageScalarWhereInput | CadenceStageScalarWhereInput[]
    OR?: CadenceStageScalarWhereInput[]
    NOT?: CadenceStageScalarWhereInput | CadenceStageScalarWhereInput[]
    id?: StringFilter<"CadenceStage"> | string
    cadenceId?: StringFilter<"CadenceStage"> | string
    order?: IntFilter<"CadenceStage"> | number
    channel?: EnumTemplateChannelFilter<"CadenceStage"> | $Enums.TemplateChannel
    delayDays?: IntFilter<"CadenceStage"> | number
    templateId?: StringNullableFilter<"CadenceStage"> | string | null
    createdAt?: DateTimeFilter<"CadenceStage"> | Date | string
    updatedAt?: DateTimeFilter<"CadenceStage"> | Date | string
  }

  export type LeadCadenceProgressUpsertWithWhereUniqueWithoutCadenceInput = {
    where: LeadCadenceProgressWhereUniqueInput
    update: XOR<LeadCadenceProgressUpdateWithoutCadenceInput, LeadCadenceProgressUncheckedUpdateWithoutCadenceInput>
    create: XOR<LeadCadenceProgressCreateWithoutCadenceInput, LeadCadenceProgressUncheckedCreateWithoutCadenceInput>
  }

  export type LeadCadenceProgressUpdateWithWhereUniqueWithoutCadenceInput = {
    where: LeadCadenceProgressWhereUniqueInput
    data: XOR<LeadCadenceProgressUpdateWithoutCadenceInput, LeadCadenceProgressUncheckedUpdateWithoutCadenceInput>
  }

  export type LeadCadenceProgressUpdateManyWithWhereWithoutCadenceInput = {
    where: LeadCadenceProgressScalarWhereInput
    data: XOR<LeadCadenceProgressUpdateManyMutationInput, LeadCadenceProgressUncheckedUpdateManyWithoutCadenceInput>
  }

  export type LeadCadenceProgressScalarWhereInput = {
    AND?: LeadCadenceProgressScalarWhereInput | LeadCadenceProgressScalarWhereInput[]
    OR?: LeadCadenceProgressScalarWhereInput[]
    NOT?: LeadCadenceProgressScalarWhereInput | LeadCadenceProgressScalarWhereInput[]
    id?: StringFilter<"LeadCadenceProgress"> | string
    profileId?: StringFilter<"LeadCadenceProgress"> | string
    leadId?: StringFilter<"LeadCadenceProgress"> | string
    cadenceId?: StringFilter<"LeadCadenceProgress"> | string
    currentStageOrder?: IntFilter<"LeadCadenceProgress"> | number
    nextStageOrder?: IntNullableFilter<"LeadCadenceProgress"> | number | null
    status?: EnumCadenceStatusFilter<"LeadCadenceProgress"> | $Enums.CadenceStatus
    pausedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    exitReason?: StringNullableFilter<"LeadCadenceProgress"> | string | null
    nextScheduledAt?: DateTimeFilter<"LeadCadenceProgress"> | Date | string
    lastActionAt?: DateTimeFilter<"LeadCadenceProgress"> | Date | string
    version?: IntFilter<"LeadCadenceProgress"> | number
    lockedAt?: DateTimeNullableFilter<"LeadCadenceProgress"> | Date | string | null
    lockedBy?: StringNullableFilter<"LeadCadenceProgress"> | string | null
  }

  export type CadenceEngineCreateWithoutStagesInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutCadencesInput
    progressions?: LeadCadenceProgressCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineUncheckedCreateWithoutStagesInput = {
    id?: string
    profileId?: string | null
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    progressions?: LeadCadenceProgressUncheckedCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineCreateOrConnectWithoutStagesInput = {
    where: CadenceEngineWhereUniqueInput
    create: XOR<CadenceEngineCreateWithoutStagesInput, CadenceEngineUncheckedCreateWithoutStagesInput>
  }

  export type TemplateCreateWithoutCadenceStagesInput = {
    id?: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateUncheckedCreateWithoutCadenceStagesInput = {
    id?: string
    profileId: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateCreateOrConnectWithoutCadenceStagesInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutCadenceStagesInput, TemplateUncheckedCreateWithoutCadenceStagesInput>
  }

  export type CadenceEngineUpsertWithoutStagesInput = {
    update: XOR<CadenceEngineUpdateWithoutStagesInput, CadenceEngineUncheckedUpdateWithoutStagesInput>
    create: XOR<CadenceEngineCreateWithoutStagesInput, CadenceEngineUncheckedCreateWithoutStagesInput>
    where?: CadenceEngineWhereInput
  }

  export type CadenceEngineUpdateToOneWithWhereWithoutStagesInput = {
    where?: CadenceEngineWhereInput
    data: XOR<CadenceEngineUpdateWithoutStagesInput, CadenceEngineUncheckedUpdateWithoutStagesInput>
  }

  export type CadenceEngineUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutCadencesNestedInput
    progressions?: LeadCadenceProgressUpdateManyWithoutCadenceNestedInput
  }

  export type CadenceEngineUncheckedUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    progressions?: LeadCadenceProgressUncheckedUpdateManyWithoutCadenceNestedInput
  }

  export type TemplateUpsertWithoutCadenceStagesInput = {
    update: XOR<TemplateUpdateWithoutCadenceStagesInput, TemplateUncheckedUpdateWithoutCadenceStagesInput>
    create: XOR<TemplateCreateWithoutCadenceStagesInput, TemplateUncheckedCreateWithoutCadenceStagesInput>
    where?: TemplateWhereInput
  }

  export type TemplateUpdateToOneWithWhereWithoutCadenceStagesInput = {
    where?: TemplateWhereInput
    data: XOR<TemplateUpdateWithoutCadenceStagesInput, TemplateUncheckedUpdateWithoutCadenceStagesInput>
  }

  export type TemplateUpdateWithoutCadenceStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutTemplatesNestedInput
  }

  export type TemplateUncheckedUpdateWithoutCadenceStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateWithoutCadenceEngineInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutLeadsInput
    lastOperator?: OperatorCreateNestedOneWithoutLeadsInput
    histories?: LeadHistoryCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutCadenceEngineInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    histories?: LeadHistoryUncheckedCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutCadenceEngineInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutCadenceEngineInput, LeadUncheckedCreateWithoutCadenceEngineInput>
  }

  export type CadenceEngineCreateWithoutProgressionsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutCadencesInput
    stages?: CadenceStageCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineUncheckedCreateWithoutProgressionsInput = {
    id?: string
    profileId?: string | null
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: CadenceStageUncheckedCreateNestedManyWithoutCadenceInput
  }

  export type CadenceEngineCreateOrConnectWithoutProgressionsInput = {
    where: CadenceEngineWhereUniqueInput
    create: XOR<CadenceEngineCreateWithoutProgressionsInput, CadenceEngineUncheckedCreateWithoutProgressionsInput>
  }

  export type LeadCadenceEventCreateWithoutProgressionInput = {
    id?: string
    leadId: string
    action: string
    fromStage?: number | null
    toStage?: number | null
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type LeadCadenceEventUncheckedCreateWithoutProgressionInput = {
    id?: string
    leadId: string
    action: string
    fromStage?: number | null
    toStage?: number | null
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type LeadCadenceEventCreateOrConnectWithoutProgressionInput = {
    where: LeadCadenceEventWhereUniqueInput
    create: XOR<LeadCadenceEventCreateWithoutProgressionInput, LeadCadenceEventUncheckedCreateWithoutProgressionInput>
  }

  export type LeadCadenceEventCreateManyProgressionInputEnvelope = {
    data: LeadCadenceEventCreateManyProgressionInput | LeadCadenceEventCreateManyProgressionInput[]
    skipDuplicates?: boolean
  }

  export type LeadUpsertWithoutCadenceEngineInput = {
    update: XOR<LeadUpdateWithoutCadenceEngineInput, LeadUncheckedUpdateWithoutCadenceEngineInput>
    create: XOR<LeadCreateWithoutCadenceEngineInput, LeadUncheckedCreateWithoutCadenceEngineInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutCadenceEngineInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutCadenceEngineInput, LeadUncheckedUpdateWithoutCadenceEngineInput>
  }

  export type LeadUpdateWithoutCadenceEngineInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutLeadsNestedInput
    lastOperator?: OperatorUpdateOneWithoutLeadsNestedInput
    histories?: LeadHistoryUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutCadenceEngineInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: LeadHistoryUncheckedUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type CadenceEngineUpsertWithoutProgressionsInput = {
    update: XOR<CadenceEngineUpdateWithoutProgressionsInput, CadenceEngineUncheckedUpdateWithoutProgressionsInput>
    create: XOR<CadenceEngineCreateWithoutProgressionsInput, CadenceEngineUncheckedCreateWithoutProgressionsInput>
    where?: CadenceEngineWhereInput
  }

  export type CadenceEngineUpdateToOneWithWhereWithoutProgressionsInput = {
    where?: CadenceEngineWhereInput
    data: XOR<CadenceEngineUpdateWithoutProgressionsInput, CadenceEngineUncheckedUpdateWithoutProgressionsInput>
  }

  export type CadenceEngineUpdateWithoutProgressionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutCadencesNestedInput
    stages?: CadenceStageUpdateManyWithoutCadenceNestedInput
  }

  export type CadenceEngineUncheckedUpdateWithoutProgressionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: CadenceStageUncheckedUpdateManyWithoutCadenceNestedInput
  }

  export type LeadCadenceEventUpsertWithWhereUniqueWithoutProgressionInput = {
    where: LeadCadenceEventWhereUniqueInput
    update: XOR<LeadCadenceEventUpdateWithoutProgressionInput, LeadCadenceEventUncheckedUpdateWithoutProgressionInput>
    create: XOR<LeadCadenceEventCreateWithoutProgressionInput, LeadCadenceEventUncheckedCreateWithoutProgressionInput>
  }

  export type LeadCadenceEventUpdateWithWhereUniqueWithoutProgressionInput = {
    where: LeadCadenceEventWhereUniqueInput
    data: XOR<LeadCadenceEventUpdateWithoutProgressionInput, LeadCadenceEventUncheckedUpdateWithoutProgressionInput>
  }

  export type LeadCadenceEventUpdateManyWithWhereWithoutProgressionInput = {
    where: LeadCadenceEventScalarWhereInput
    data: XOR<LeadCadenceEventUpdateManyMutationInput, LeadCadenceEventUncheckedUpdateManyWithoutProgressionInput>
  }

  export type LeadCadenceEventScalarWhereInput = {
    AND?: LeadCadenceEventScalarWhereInput | LeadCadenceEventScalarWhereInput[]
    OR?: LeadCadenceEventScalarWhereInput[]
    NOT?: LeadCadenceEventScalarWhereInput | LeadCadenceEventScalarWhereInput[]
    id?: StringFilter<"LeadCadenceEvent"> | string
    leadCadenceProgressId?: StringFilter<"LeadCadenceEvent"> | string
    leadId?: StringFilter<"LeadCadenceEvent"> | string
    action?: StringFilter<"LeadCadenceEvent"> | string
    fromStage?: IntNullableFilter<"LeadCadenceEvent"> | number | null
    toStage?: IntNullableFilter<"LeadCadenceEvent"> | number | null
    operatorId?: StringNullableFilter<"LeadCadenceEvent"> | string | null
    notes?: StringNullableFilter<"LeadCadenceEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadCadenceEvent"> | Date | string
  }

  export type LeadCadenceProgressCreateWithoutEventsInput = {
    id?: string
    profileId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
    lead: LeadCreateNestedOneWithoutCadenceEngineInput
    cadence: CadenceEngineCreateNestedOneWithoutProgressionsInput
  }

  export type LeadCadenceProgressUncheckedCreateWithoutEventsInput = {
    id?: string
    profileId: string
    leadId: string
    cadenceId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type LeadCadenceProgressCreateOrConnectWithoutEventsInput = {
    where: LeadCadenceProgressWhereUniqueInput
    create: XOR<LeadCadenceProgressCreateWithoutEventsInput, LeadCadenceProgressUncheckedCreateWithoutEventsInput>
  }

  export type LeadCadenceProgressUpsertWithoutEventsInput = {
    update: XOR<LeadCadenceProgressUpdateWithoutEventsInput, LeadCadenceProgressUncheckedUpdateWithoutEventsInput>
    create: XOR<LeadCadenceProgressCreateWithoutEventsInput, LeadCadenceProgressUncheckedCreateWithoutEventsInput>
    where?: LeadCadenceProgressWhereInput
  }

  export type LeadCadenceProgressUpdateToOneWithWhereWithoutEventsInput = {
    where?: LeadCadenceProgressWhereInput
    data: XOR<LeadCadenceProgressUpdateWithoutEventsInput, LeadCadenceProgressUncheckedUpdateWithoutEventsInput>
  }

  export type LeadCadenceProgressUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    lead?: LeadUpdateOneRequiredWithoutCadenceEngineNestedInput
    cadence?: CadenceEngineUpdateOneRequiredWithoutProgressionsNestedInput
  }

  export type LeadCadenceProgressUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCreateWithoutTemplatesInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutProfileInput
    operators?: OperatorCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineCreateNestedManyWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutTemplatesInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutProfileInput
    operators?: OperatorUncheckedCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineUncheckedCreateNestedManyWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutTemplatesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutTemplatesInput, ProfileUncheckedCreateWithoutTemplatesInput>
  }

  export type CadenceStageCreateWithoutTemplateInput = {
    id?: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cadence: CadenceEngineCreateNestedOneWithoutStagesInput
  }

  export type CadenceStageUncheckedCreateWithoutTemplateInput = {
    id?: string
    cadenceId: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceStageCreateOrConnectWithoutTemplateInput = {
    where: CadenceStageWhereUniqueInput
    create: XOR<CadenceStageCreateWithoutTemplateInput, CadenceStageUncheckedCreateWithoutTemplateInput>
  }

  export type CadenceStageCreateManyTemplateInputEnvelope = {
    data: CadenceStageCreateManyTemplateInput | CadenceStageCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutTemplatesInput = {
    update: XOR<ProfileUpdateWithoutTemplatesInput, ProfileUncheckedUpdateWithoutTemplatesInput>
    create: XOR<ProfileCreateWithoutTemplatesInput, ProfileUncheckedCreateWithoutTemplatesInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutTemplatesInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutTemplatesInput, ProfileUncheckedUpdateWithoutTemplatesInput>
  }

  export type ProfileUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutProfileNestedInput
    operators?: OperatorUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutProfileNestedInput
    operators?: OperatorUncheckedUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUncheckedUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type CadenceStageUpsertWithWhereUniqueWithoutTemplateInput = {
    where: CadenceStageWhereUniqueInput
    update: XOR<CadenceStageUpdateWithoutTemplateInput, CadenceStageUncheckedUpdateWithoutTemplateInput>
    create: XOR<CadenceStageCreateWithoutTemplateInput, CadenceStageUncheckedCreateWithoutTemplateInput>
  }

  export type CadenceStageUpdateWithWhereUniqueWithoutTemplateInput = {
    where: CadenceStageWhereUniqueInput
    data: XOR<CadenceStageUpdateWithoutTemplateInput, CadenceStageUncheckedUpdateWithoutTemplateInput>
  }

  export type CadenceStageUpdateManyWithWhereWithoutTemplateInput = {
    where: CadenceStageScalarWhereInput
    data: XOR<CadenceStageUpdateManyMutationInput, CadenceStageUncheckedUpdateManyWithoutTemplateInput>
  }

  export type LeadCreateWithoutHistoriesInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutLeadsInput
    lastOperator?: OperatorCreateNestedOneWithoutLeadsInput
    leadNotes?: LeadNoteCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutHistoriesInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressUncheckedCreateNestedOneWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutHistoriesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutHistoriesInput, LeadUncheckedCreateWithoutHistoriesInput>
  }

  export type LeadUpsertWithoutHistoriesInput = {
    update: XOR<LeadUpdateWithoutHistoriesInput, LeadUncheckedUpdateWithoutHistoriesInput>
    create: XOR<LeadCreateWithoutHistoriesInput, LeadUncheckedCreateWithoutHistoriesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutHistoriesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutHistoriesInput, LeadUncheckedUpdateWithoutHistoriesInput>
  }

  export type LeadUpdateWithoutHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutLeadsNestedInput
    lastOperator?: OperatorUpdateOneWithoutLeadsNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUncheckedUpdateOneWithoutLeadNestedInput
  }

  export type ProfileCreateWithoutOperatorsInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutProfileInput
    templates?: TemplateCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineCreateNestedManyWithoutProfileInput
    notifications?: NotificationCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutOperatorsInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutProfileInput
    templates?: TemplateUncheckedCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineUncheckedCreateNestedManyWithoutProfileInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutOperatorsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutOperatorsInput, ProfileUncheckedCreateWithoutOperatorsInput>
  }

  export type LeadCreateWithoutLastOperatorInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutLeadsInput
    histories?: LeadHistoryCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutLastOperatorInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    histories?: LeadHistoryUncheckedCreateNestedManyWithoutLeadInput
    leadNotes?: LeadNoteUncheckedCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressUncheckedCreateNestedOneWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutLastOperatorInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutLastOperatorInput, LeadUncheckedCreateWithoutLastOperatorInput>
  }

  export type LeadCreateManyLastOperatorInputEnvelope = {
    data: LeadCreateManyLastOperatorInput | LeadCreateManyLastOperatorInput[]
    skipDuplicates?: boolean
  }

  export type LeadNoteCreateWithoutOperatorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lead: LeadCreateNestedOneWithoutLeadNotesInput
  }

  export type LeadNoteUncheckedCreateWithoutOperatorInput = {
    id?: string
    leadId: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadNoteCreateOrConnectWithoutOperatorInput = {
    where: LeadNoteWhereUniqueInput
    create: XOR<LeadNoteCreateWithoutOperatorInput, LeadNoteUncheckedCreateWithoutOperatorInput>
  }

  export type LeadNoteCreateManyOperatorInputEnvelope = {
    data: LeadNoteCreateManyOperatorInput | LeadNoteCreateManyOperatorInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutOperatorsInput = {
    update: XOR<ProfileUpdateWithoutOperatorsInput, ProfileUncheckedUpdateWithoutOperatorsInput>
    create: XOR<ProfileCreateWithoutOperatorsInput, ProfileUncheckedCreateWithoutOperatorsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutOperatorsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutOperatorsInput, ProfileUncheckedUpdateWithoutOperatorsInput>
  }

  export type ProfileUpdateWithoutOperatorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutProfileNestedInput
    templates?: TemplateUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutOperatorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutProfileNestedInput
    templates?: TemplateUncheckedUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUncheckedUpdateManyWithoutProfileNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type LeadUpsertWithWhereUniqueWithoutLastOperatorInput = {
    where: LeadWhereUniqueInput
    update: XOR<LeadUpdateWithoutLastOperatorInput, LeadUncheckedUpdateWithoutLastOperatorInput>
    create: XOR<LeadCreateWithoutLastOperatorInput, LeadUncheckedCreateWithoutLastOperatorInput>
  }

  export type LeadUpdateWithWhereUniqueWithoutLastOperatorInput = {
    where: LeadWhereUniqueInput
    data: XOR<LeadUpdateWithoutLastOperatorInput, LeadUncheckedUpdateWithoutLastOperatorInput>
  }

  export type LeadUpdateManyWithWhereWithoutLastOperatorInput = {
    where: LeadScalarWhereInput
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyWithoutLastOperatorInput>
  }

  export type LeadNoteUpsertWithWhereUniqueWithoutOperatorInput = {
    where: LeadNoteWhereUniqueInput
    update: XOR<LeadNoteUpdateWithoutOperatorInput, LeadNoteUncheckedUpdateWithoutOperatorInput>
    create: XOR<LeadNoteCreateWithoutOperatorInput, LeadNoteUncheckedCreateWithoutOperatorInput>
  }

  export type LeadNoteUpdateWithWhereUniqueWithoutOperatorInput = {
    where: LeadNoteWhereUniqueInput
    data: XOR<LeadNoteUpdateWithoutOperatorInput, LeadNoteUncheckedUpdateWithoutOperatorInput>
  }

  export type LeadNoteUpdateManyWithWhereWithoutOperatorInput = {
    where: LeadNoteScalarWhereInput
    data: XOR<LeadNoteUpdateManyMutationInput, LeadNoteUncheckedUpdateManyWithoutOperatorInput>
  }

  export type LeadCreateWithoutLeadNotesInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutLeadsInput
    lastOperator?: OperatorCreateNestedOneWithoutLeadsInput
    histories?: LeadHistoryCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressCreateNestedOneWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutLeadNotesInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    histories?: LeadHistoryUncheckedCreateNestedManyWithoutLeadInput
    cadenceEngine?: LeadCadenceProgressUncheckedCreateNestedOneWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutLeadNotesInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutLeadNotesInput, LeadUncheckedCreateWithoutLeadNotesInput>
  }

  export type OperatorCreateWithoutLeadNotesInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutOperatorsInput
    leads?: LeadCreateNestedManyWithoutLastOperatorInput
  }

  export type OperatorUncheckedCreateWithoutLeadNotesInput = {
    id?: string
    profileId: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutLastOperatorInput
  }

  export type OperatorCreateOrConnectWithoutLeadNotesInput = {
    where: OperatorWhereUniqueInput
    create: XOR<OperatorCreateWithoutLeadNotesInput, OperatorUncheckedCreateWithoutLeadNotesInput>
  }

  export type LeadUpsertWithoutLeadNotesInput = {
    update: XOR<LeadUpdateWithoutLeadNotesInput, LeadUncheckedUpdateWithoutLeadNotesInput>
    create: XOR<LeadCreateWithoutLeadNotesInput, LeadUncheckedCreateWithoutLeadNotesInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutLeadNotesInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutLeadNotesInput, LeadUncheckedUpdateWithoutLeadNotesInput>
  }

  export type LeadUpdateWithoutLeadNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutLeadsNestedInput
    lastOperator?: OperatorUpdateOneWithoutLeadsNestedInput
    histories?: LeadHistoryUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutLeadNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: LeadHistoryUncheckedUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUncheckedUpdateOneWithoutLeadNestedInput
  }

  export type OperatorUpsertWithoutLeadNotesInput = {
    update: XOR<OperatorUpdateWithoutLeadNotesInput, OperatorUncheckedUpdateWithoutLeadNotesInput>
    create: XOR<OperatorCreateWithoutLeadNotesInput, OperatorUncheckedCreateWithoutLeadNotesInput>
    where?: OperatorWhereInput
  }

  export type OperatorUpdateToOneWithWhereWithoutLeadNotesInput = {
    where?: OperatorWhereInput
    data: XOR<OperatorUpdateWithoutLeadNotesInput, OperatorUncheckedUpdateWithoutLeadNotesInput>
  }

  export type OperatorUpdateWithoutLeadNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutOperatorsNestedInput
    leads?: LeadUpdateManyWithoutLastOperatorNestedInput
  }

  export type OperatorUncheckedUpdateWithoutLeadNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutLastOperatorNestedInput
  }

  export type ProfileCreateWithoutNotificationsInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadCreateNestedManyWithoutProfileInput
    templates?: TemplateCreateNestedManyWithoutProfileInput
    operators?: OperatorCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutNotificationsInput = {
    id?: string
    authUid: string
    name: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leads?: LeadUncheckedCreateNestedManyWithoutProfileInput
    templates?: TemplateUncheckedCreateNestedManyWithoutProfileInput
    operators?: OperatorUncheckedCreateNestedManyWithoutProfileInput
    cadences?: CadenceEngineUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutNotificationsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
  }

  export type ProfileUpsertWithoutNotificationsInput = {
    update: XOR<ProfileUpdateWithoutNotificationsInput, ProfileUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ProfileCreateWithoutNotificationsInput, ProfileUncheckedCreateWithoutNotificationsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutNotificationsInput, ProfileUncheckedUpdateWithoutNotificationsInput>
  }

  export type ProfileUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutProfileNestedInput
    templates?: TemplateUpdateManyWithoutProfileNestedInput
    operators?: OperatorUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authUid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutProfileNestedInput
    templates?: TemplateUncheckedUpdateManyWithoutProfileNestedInput
    operators?: OperatorUncheckedUpdateManyWithoutProfileNestedInput
    cadences?: CadenceEngineUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type LeadCreateManyProfileInput = {
    id?: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    lastOperatorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateCreateManyProfileInput = {
    id?: string
    name: string
    channel: $Enums.TemplateChannel
    subject?: string | null
    body: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OperatorCreateManyProfileInput = {
    id?: string
    name: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceEngineCreateManyProfileInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyProfileInput = {
    id?: string
    leadId?: string | null
    title: string
    message: string
    isRead?: boolean
    type?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastOperator?: OperatorUpdateOneWithoutLeadsNestedInput
    histories?: LeadHistoryUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: LeadHistoryUncheckedUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUncheckedUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    lastOperatorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cadenceStages?: CadenceStageUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cadenceStages?: CadenceStageUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OperatorUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUpdateManyWithoutLastOperatorNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leads?: LeadUncheckedUpdateManyWithoutLastOperatorNestedInput
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutOperatorNestedInput
  }

  export type OperatorUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceEngineUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: CadenceStageUpdateManyWithoutCadenceNestedInput
    progressions?: LeadCadenceProgressUpdateManyWithoutCadenceNestedInput
  }

  export type CadenceEngineUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: CadenceStageUncheckedUpdateManyWithoutCadenceNestedInput
    progressions?: LeadCadenceProgressUncheckedUpdateManyWithoutCadenceNestedInput
  }

  export type CadenceEngineUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadHistoryCreateManyLeadInput = {
    id?: string
    previousData: JsonNullValueInput | InputJsonValue
    newData: JsonNullValueInput | InputJsonValue
    actionBy?: string | null
    createdAt?: Date | string
  }

  export type LeadNoteCreateManyLeadInput = {
    id?: string
    operatorId?: string | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadHistoryUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadHistoryUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadHistoryUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    previousData?: JsonNullValueInput | InputJsonValue
    newData?: JsonNullValueInput | InputJsonValue
    actionBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operator?: OperatorUpdateOneWithoutLeadNotesNestedInput
  }

  export type LeadNoteUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageCreateManyCadenceInput = {
    id?: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    templateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadCadenceProgressCreateManyCadenceInput = {
    id?: string
    profileId: string
    leadId: string
    currentStageOrder?: number
    nextStageOrder?: number | null
    status?: $Enums.CadenceStatus
    pausedAt?: Date | string | null
    finishedAt?: Date | string | null
    exitReason?: string | null
    nextScheduledAt: Date | string
    lastActionAt?: Date | string
    version?: number
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type CadenceStageUpdateWithoutCadenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: TemplateUpdateOneWithoutCadenceStagesNestedInput
  }

  export type CadenceStageUncheckedUpdateWithoutCadenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageUncheckedUpdateManyWithoutCadenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCadenceProgressUpdateWithoutCadenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    lead?: LeadUpdateOneRequiredWithoutCadenceEngineNestedInput
    events?: LeadCadenceEventUpdateManyWithoutProgressionNestedInput
  }

  export type LeadCadenceProgressUncheckedUpdateWithoutCadenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
    events?: LeadCadenceEventUncheckedUpdateManyWithoutProgressionNestedInput
  }

  export type LeadCadenceProgressUncheckedUpdateManyWithoutCadenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    currentStageOrder?: IntFieldUpdateOperationsInput | number
    nextStageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumCadenceStatusFieldUpdateOperationsInput | $Enums.CadenceStatus
    pausedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exitReason?: NullableStringFieldUpdateOperationsInput | string | null
    nextScheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActionAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeadCadenceEventCreateManyProgressionInput = {
    id?: string
    leadId: string
    action: string
    fromStage?: number | null
    toStage?: number | null
    operatorId?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type LeadCadenceEventUpdateWithoutProgressionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCadenceEventUncheckedUpdateWithoutProgressionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCadenceEventUncheckedUpdateManyWithoutProgressionInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    fromStage?: NullableIntFieldUpdateOperationsInput | number | null
    toStage?: NullableIntFieldUpdateOperationsInput | number | null
    operatorId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageCreateManyTemplateInput = {
    id?: string
    cadenceId: string
    order: number
    channel: $Enums.TemplateChannel
    delayDays: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CadenceStageUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cadence?: CadenceEngineUpdateOneRequiredWithoutStagesNestedInput
  }

  export type CadenceStageUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CadenceStageUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cadenceId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    channel?: EnumTemplateChannelFieldUpdateOperationsInput | $Enums.TemplateChannel
    delayDays?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadCreateManyLastOperatorInput = {
    id?: string
    profileId: string
    code?: string
    fullName: string
    company?: string | null
    jobTitle?: string | null
    email?: string | null
    phone?: string | null
    linkedinUrl?: string | null
    whatsappUrl?: string | null
    status?: $Enums.LeadStatus
    source?: $Enums.LeadSource
    notes?: string | null
    importBatchId?: string | null
    customSource?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadNoteCreateManyOperatorInput = {
    id?: string
    leadId: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateWithoutLastOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutLeadsNestedInput
    histories?: LeadHistoryUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutLastOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: LeadHistoryUncheckedUpdateManyWithoutLeadNestedInput
    leadNotes?: LeadNoteUncheckedUpdateManyWithoutLeadNestedInput
    cadenceEngine?: LeadCadenceProgressUncheckedUpdateOneWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateManyWithoutLastOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumLeadStatusFieldUpdateOperationsInput | $Enums.LeadStatus
    source?: EnumLeadSourceFieldUpdateOperationsInput | $Enums.LeadSource
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    importBatchId?: NullableStringFieldUpdateOperationsInput | string | null
    customSource?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutLeadNotesNestedInput
  }

  export type LeadNoteUncheckedUpdateWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadNoteUncheckedUpdateManyWithoutOperatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}