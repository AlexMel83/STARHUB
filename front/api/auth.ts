export interface AuthResponse {
  status: number;
  data: {
    user: {
      email: string;
      name: string;
      role: string;
      isactivated: boolean;
    };
    url: string;
  };
};

interface AuthUser {
  data: {
    id: number;
    email: string;
    name: string;
    role: string;
    isactivated: boolean;
  }
};

export interface AuthApi {
  signIn(payload: { email: string; password: string }): Promise<AuthResponse>;
  signUp(payload: { email: string; password: string }): Promise<AuthResponse>;
  logout(): Promise<any>;
  socAuth(provider: string): Promise<AuthResponse>;
  getAuthUser(authLink: string): Promise<AuthUser>;
}

export default function (instance: any): AuthApi {
  return {
    signIn(payload: {
      email: string;
      password: string;
    }): Promise<AuthResponse> {
      return instance.post("/login", payload);
    },
    signUp(payload: {
      email: string;
      password: string;
    }): Promise<AuthResponse> {
      return instance.post("/registration", payload);
    },
    logout() {
      return instance.post("/logout");
    },
    socAuth(provider) {
      return instance.get(`/social-login/${provider}`, {credentials: 'include'},);
    },
    getAuthUser(authLink) {
      return instance.post(`/auth-user/${authLink}`)
    },
  };
}
