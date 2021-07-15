import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  async getUserInfo(token: string): Promise<any> {
    try {
      const res = await axios.get(process.env.AUTH0_ISSUER_URL + 'userinfo', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data != 500) {
        return error.response.data;
      }
      throw error;
    }
  }
}
