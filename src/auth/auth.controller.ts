import { Controller, Post, Body, Inject } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUser: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUser);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    return this.client.send('auth.login.user', loginUser);
  }

  @Post('verify')
  verifyToken() {
    return this.client.send('auth.verify.user', {});
  }
}
