import * as jwt from 'jsonwebtoken';

export class JwtConfig {
  public static async generateToken(id: number) {
    return await jwt.sign({ data: id }, 'secret', { expiresIn: '23h' });
  }

  public static async decodeToken(token: string) {
    await jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        console.log(err);
      }
      return decoded.id;
    });
  }
}
