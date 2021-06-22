import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export type User = any;


@Injectable()
export class AuthService {

  private readonly users = [
    {
      userId: 1,
      username: 'guoguo',
      password: 'guoguo',
    },
    {
      userId: 2,
      username: 'guoguo2',
      password: 'guoguo2',
    },
  ];
  constructor(
    private jwtService: JwtService,
    
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(user => user.username === username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    console.log('token', token);
    return {
      token,
    };
  }

}
