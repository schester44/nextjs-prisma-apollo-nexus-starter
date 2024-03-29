/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"


declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ProjectUsersProjectIdUserIdCompoundUniqueInput: { // input type
    projectId: string; // String!
    userId: string; // String!
  }
  ProjectUsersWhereUniqueInput: { // input type
    projectId_userId?: NexusGenInputs['ProjectUsersProjectIdUserIdCompoundUniqueInput'] | null; // ProjectUsersProjectIdUserIdCompoundUniqueInput
  }
  SubscriptionWhereUniqueInput: { // input type
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
  PaidPlan: "advanced" | "basic" | "pro"
  ProjectUserRole: "ADMIN" | "USER"
  UserRole: "ADMIN" | "USER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Mutation: {};
  Project: { // root type
    id: string; // String!
    name: string; // String!
  }
  ProjectUsers: { // root type
    role: NexusGenEnums['ProjectUserRole']; // ProjectUserRole!
  }
  Query: {};
  Subscription: { // root type
    endDate: NexusGenScalars['DateTime']; // DateTime!
    externalProductId: string; // String!
    id: string; // String!
  }
  User: { // root type
    email?: string | null; // String
    id: string; // String!
    name?: string | null; // String
  }
  UserInvites: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    changeSessionProject: boolean | null; // Boolean
    changeSubscriptionPlan: boolean | null; // Boolean
    createBillingPortalSession: string | null; // String
    createCheckoutSession: string | null; // String
    createProject: NexusGenRootTypes['Project'] | null; // Project
    deleteProject: boolean | null; // Boolean
    inviteUserToProject: boolean | null; // Boolean
    updateProject: NexusGenRootTypes['Project'] | null; // Project
  }
  Project: { // field return type
    id: string; // String!
    isPaying: boolean | null; // Boolean
    name: string; // String!
    subscriptions: NexusGenRootTypes['Subscription'][]; // [Subscription!]!
    users: NexusGenRootTypes['ProjectUsers'][]; // [ProjectUsers!]!
  }
  ProjectUsers: { // field return type
    project: NexusGenRootTypes['Project']; // Project!
    role: NexusGenEnums['ProjectUserRole']; // ProjectUserRole!
    user: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    currentUser: NexusGenRootTypes['User'] | null; // User
    project: NexusGenRootTypes['Project'] | null; // Project
    projectUsers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    projects: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
  }
  Subscription: { // field return type
    endDate: NexusGenScalars['DateTime']; // DateTime!
    externalProductId: string; // String!
    id: string; // String!
    planLevel: NexusGenEnums['PaidPlan'] | null; // PaidPlan
  }
  User: { // field return type
    email: string | null; // String
    id: string; // String!
    name: string | null; // String
    projects: NexusGenRootTypes['ProjectUsers'][]; // [ProjectUsers!]!
  }
  UserInvites: { // field return type
    invitedBy: NexusGenRootTypes['User']; // User!
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    changeSessionProject: 'Boolean'
    changeSubscriptionPlan: 'Boolean'
    createBillingPortalSession: 'String'
    createCheckoutSession: 'String'
    createProject: 'Project'
    deleteProject: 'Boolean'
    inviteUserToProject: 'Boolean'
    updateProject: 'Project'
  }
  Project: { // field return type name
    id: 'String'
    isPaying: 'Boolean'
    name: 'String'
    subscriptions: 'Subscription'
    users: 'ProjectUsers'
  }
  ProjectUsers: { // field return type name
    project: 'Project'
    role: 'ProjectUserRole'
    user: 'User'
  }
  Query: { // field return type name
    currentUser: 'User'
    project: 'Project'
    projectUsers: 'User'
    projects: 'Project'
  }
  Subscription: { // field return type name
    endDate: 'DateTime'
    externalProductId: 'String'
    id: 'String'
    planLevel: 'PaidPlan'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    name: 'String'
    projects: 'ProjectUsers'
  }
  UserInvites: { // field return type name
    invitedBy: 'User'
    user: 'User'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    changeSessionProject: { // args
      projectId: string; // String!
    }
    changeSubscriptionPlan: { // args
      plan: string; // String!
      projectId: string; // String!
    }
    createBillingPortalSession: { // args
      projectId: string; // String!
    }
    createCheckoutSession: { // args
      plan: string; // String!
      projectId: string; // String!
    }
    createProject: { // args
      name: string; // String!
    }
    deleteProject: { // args
      id: string; // String!
    }
    inviteUserToProject: { // args
      email: string; // String!
      name: string; // String!
      projectId: string; // String!
    }
    updateProject: { // args
      id: string; // String!
      name: string; // String!
    }
  }
  Project: {
    subscriptions: { // args
      after?: NexusGenInputs['SubscriptionWhereUniqueInput'] | null; // SubscriptionWhereUniqueInput
      before?: NexusGenInputs['SubscriptionWhereUniqueInput'] | null; // SubscriptionWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    users: { // args
      after?: NexusGenInputs['ProjectUsersWhereUniqueInput'] | null; // ProjectUsersWhereUniqueInput
      before?: NexusGenInputs['ProjectUsersWhereUniqueInput'] | null; // ProjectUsersWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Query: {
    project: { // args
      id?: string | null; // String
    }
    projectUsers: { // args
      projectId: string; // String!
    }
  }
  User: {
    projects: { // args
      after?: NexusGenInputs['ProjectUsersWhereUniqueInput'] | null; // ProjectUsersWhereUniqueInput
      before?: NexusGenInputs['ProjectUsersWhereUniqueInput'] | null; // ProjectUsersWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}