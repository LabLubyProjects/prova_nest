import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { RecoverInput } from './dto/recover.input';
import { ResetInput } from './dto/reset.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: AuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return {
      user: response.user,
      token: response.token,
    };
  }

  @Mutation(() => String)
  public async forgotPassword(
    @Args('data') data: RecoverInput,
  ): Promise<string> {
    await this.authService.forgotPassword(data.email);
    return 'Keep your eyes on your email account, we have sent you an recover email';
  }

  @Mutation(() => String)
  public async resetPassword(@Args('data') data: ResetInput): Promise<string> {
    await this.authService.resetPassword(data);
    return 'Password was reset successfully';
  }
}
