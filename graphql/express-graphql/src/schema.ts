import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from "graphql"

import axios from 'axios'
import { resolve } from "dns"

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parentValue, args) {
        const id = parentValue.companyId
        const response = await axios.get(`http://localhost:3000/companies/${id}`)
        return response.data
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      async resolve(parentValue, args) {
        const response = await axios.get(`http://localhost:3000/users/${args.id}`)
        return response.data
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString }},
      async resolve(parentValue, args) {
        const response = await axios.get(`http://localhost:3000/companies/${args.id}`)
        return response.data
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery
})
