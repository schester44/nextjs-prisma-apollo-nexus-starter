/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "./context"
import { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"


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
    userId: number; // Int!
  }
  ProjectUsersWhereUniqueInput: { // input type
    projectId_userId?: NexusGenInputs['ProjectUsersProjectIdUserIdCompoundUniqueInput'] | null; // ProjectUsersProjectIdUserIdCompoundUniqueInput
  }
}

export interface NexusGenEnums {
  PaidPlan: "pro"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Project: { // root type
    id: string; // String!
    name: string; // String!
  }
  ProjectUsers: {};
  Query: {};
  User: Context.User;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createProject: NexusGenRootTypes['Project'] | null; // Project
  }
  Project: { // field return type
    id: string; // String!
    name: string; // String!
  }
  ProjectUsers: { // field return type
    project: NexusGenRootTypes['Project']; // Project!
    user: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    currentUser: NexusGenRootTypes['User'] | null; // User
    projects: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string | null; // String
    id: number; // Int!
    name: string | null; // String
    projects: NexusGenRootTypes['ProjectUsers'][]; // [ProjectUsers!]!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createProject: 'Project'
  }
  Project: { // field return type name
    id: 'String'
    name: 'String'
  }
  ProjectUsers: { // field return type name
    project: 'Project'
    user: 'User'
  }
  Query: { // field return type name
    currentUser: 'User'
    projects: 'Project'
    user: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    projects: 'ProjectUsers'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createProject: { // args
      projectName: string; // String!
    }
  }
  Query: {
    user: { // args
      id?: string | null; // String
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
  context: any;
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