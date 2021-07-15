import { Injectable } from '@nestjs/common';
import { User } from 'src/user';
import axios from 'axios';

@Injectable()
export class AuthzService {
  private readonly baseUrl: string = process.env.AUTH0_ISSUER_URL;
  private readonly client_id: string = process.env.CLIENT_ID;
  private readonly audience: string = process.env.AUTH0_AUDIENCE;
  private readonly redirectUri: string = process.env.REDIRECT_URI;

  async createUser(user: User): Promise<User> {
    const data = {
      ...user,
      client_id: this.client_id,
      connection: 'Username-Password-Authentication',
    };

    try {
      const res = await axios.post(
        this.baseUrl + 'dbconnections/signup',
        data,
        {
          headers: { 'content-type': 'application/json' },
        },
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.statusCode != 500) {
        return error.response.data;
      }
      throw error;
    }

    // authClient;
  }

  async login() {
    const url = `${this.baseUrl}authorize?response_type=token&client_id=${this.client_id}&redirect_uri=${this.redirectUri}&audience=${this.audience}&scope=openid profile email`;
    console.log(url);
    return url;
  }
}
