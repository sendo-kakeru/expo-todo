import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <Card className="w-full max-w-sm p-6 rounded-2xl">
      <CardHeader className="items-center">
        <Text className="font-bold text-2xl">Welcome to todo app!!</Text>
      </CardHeader>
      <CardContent>
        <Link href="/post" icon="right" className="ml-auto">
          投稿一覧
        </Link>
      </CardContent>
    </Card>
  );
}
