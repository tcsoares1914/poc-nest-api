import { User } from '../../user/user.entity'
import { CreateUserInput } from '../../user/dto/create-user.dto'

export class UserTestUtil {
  static getValidUser(): User {
    const user = new User()
    user.id = 0
    user.firstName = 'John'
    user.lastName = 'Wick'
    user.email = 'john@domain.com'
    user.password = '#password#123'

    return user
  }

  static getValidUserInput(): CreateUserInput {
    const user = new CreateUserInput()
    user.firstName = 'John'
    user.lastName = 'Wick'
    user.email = 'john@domain.com'
    user.password = '#password#123'

    return user
  }
}
