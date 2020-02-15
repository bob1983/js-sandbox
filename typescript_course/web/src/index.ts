import { User } from "./models/User";

const user = new User({ name: 'John', age: 20 })
user.set({ name: 'Jane', age: 21 })

user.on('change', () => {
  console.log('change #1')
})

user.on('change', () => {
  console.log('change #2')
})

user.on('save', () => {
  console.log('save #1')
})

user.trigger('change')
user.trigger('save')

console.log(user)
