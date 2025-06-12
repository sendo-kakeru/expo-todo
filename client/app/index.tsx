import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <Card className="m-auto w-full max-w-sm rounded-2xl p-6">
      <CardHeader className="items-center">
        <Text className="text-2xl font-bold">Welcome to todo app!!</Text>
      </CardHeader>
      <CardContent>
        <Link href="/task" icon="right" className="ml-auto">
          タスク一覧
        </Link>
      </CardContent>
    </Card>
  );
}
