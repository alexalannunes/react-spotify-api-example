import { AxiosResponse } from "axios";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Credentials, User, UserType } from "../../types";
import { api } from "../../utils";
import { useAuthContext } from "../Layout";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams(window.location.hash.slice(1));
  const { credentials, setCredential, setUser } = useAuthContext();

  useEffect(() => {
    if (params.get("access_token")) {
      const searchParamsCredentials: Credentials = {
        accessToken: params.get("access_token")!,
        tokenType: params.get("token_type")!,
        expiresIn: params.get("expires_in")!,
        state: params.get("state")!,
      };
      setCredential(searchParamsCredentials);
      localStorage.setItem(
        "session:credentials",
        JSON.stringify(searchParamsCredentials)
      );

      handleMe(searchParamsCredentials);
    }
  }, []);

  const handleMe = useCallback((credentials: Credentials) => {
    if (params.get("access_token")) {
      const token = `${credentials.tokenType} ${credentials.accessToken}`;
      const headers = {
        Authorization: token,
      };
      api.get("/me", { headers }).then((response: AxiosResponse<User>) => {
        const userData: UserType = {
          status: "idle",
          data: {
            display_name: response.data.display_name,
            id: response.data.id,
            images: response.data.images,
            product: response.data.product,
            type: response.data.type,
          },
        };
        setUser(userData);
        localStorage.setItem("session:user", JSON.stringify(userData));
        navigate("/");
      });
    }
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export { Callback };
