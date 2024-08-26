"use client";

import axios from "axios";
import { useAppDispatch } from "./lib/redux/hooks";
import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { initialize } from "./lib/redux/features/auth/auth_slice";
import toast from "react-hot-toast";

export default function Home() {
  const [userName, setUserName] = useState("");

  const dispatch = useAppDispatch();

  const logInUser = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        userName,
      });
      localStorage.setItem("user_info", JSON.stringify(data));
      dispatch(initialize(data));
    } catch (error) {
      console.log(error, "Error at logInUser");
      toast.error("Invalid credentials");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-evenly p-24">
      <Card className="p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logInUser();
          }}
          className="flex flex-col  gap-4"
        >
          <div className="flex items-center gap-4">
            <Label htmlFor="signInUserName" className="text-right">
              Username:
            </Label>
            <Input
              id="signInUserName"
              placeholder="User Name"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Log in</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
