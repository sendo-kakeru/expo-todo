import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <Card className="m-auto w-full max-w-sm rounded-2xl p-6">
      <CardHeader className="items-center">
        <Text className="font-bold text-2xl">Welcome to TODO App!!</Text>
      </CardHeader>
      <CardContent>
        <Link className="ml-auto" href="/task" icon="right">
          タスク一覧
        </Link>
        <Link className="ml-auto" href="/login" icon="right">
          ログイン
        </Link>
      </CardContent>
    </Card>
  );
}
