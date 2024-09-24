"use client";
import React from "react";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/app/SessionContext";

export default function CallToAction() {
  const { user } = useSession();
  console.log("testing", user);
  return (
    <div>
      {user != null ? (
        <div>
          <Card className="">
            <CardHeader>
              <div className="text-center">
                Sign up today to use to create word banks, quiz yourself, and
                more!
                <Link href="/signup">
                  <Button className="w-2/3 m-2 bg-green-600 hover:bg-green-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
