export interface AuthResponse {
  status: number;
  data: {
    user: {
      id: number;
      email: string | null;
      facebook_id: string | null;
      google_id: string | null;
      name: string;
      surname: string;
      phone: string;
      picture: string;
      role: string;
      social_login: boolean;
      isactivated: boolean;
      created_at: string;
      udated_at: string;
    };
    url: string;
    accessToken: string;
    expAcToken: string;
    expRfToken: string;
  };
}

export interface AuthApi {
  signIn(payload: { email: string; password: string }): Promise<AuthResponse>;
  signUp(payload: { email: string; password: string }): Promise<AuthResponse>;
  logout(): Promise<any>;
  socAuth(provider: string): Promise<AuthResponse>;
  getAuthUser(authLink: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
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
      return instance.get(`/social-login/${provider}`, {
        credentials: "include",
      });
    },
    getAuthUser(authLink) {
      return instance.post(`/auth-user/${authLink}`);
    },
    refresh(refreshToken) {
      return instance.post("/refresh", { refreshToken });
    },
  };
}
