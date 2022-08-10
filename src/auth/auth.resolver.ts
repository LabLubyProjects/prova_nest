import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GenericMessage } from 'src/helpers/generic-message.type';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { RecoverInput } from './dto/recover.input';
import { ResetInput } from './dto/reset.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
    };
  }

  @Mutation(() => GenericMessage)
  public async forgotPassword(
    @Args('data') data: RecoverInput,
  ): Promise<GenericMessage> {
    await this.authService.forgotPassword(data.email);
    return {
      message:
        'Keep your eyes on your email account, we have sent you an recover email',
    };
  }

  @Mutation(() => GenericMessage)
  public async resetPassword(
    @Args('data') data: ResetInput,
  ): Promise<GenericMessage> {
    await this.authService.resetPassword(data);
    return {
      message: 'Password was reset successfully',
    };
  }
}
