import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { View } from "react-native";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Link } from "../../../components/ui/link";
import { Text } from "../../../components/ui/text";

export default function AuthNav() {
  const { authStatus, user, signOut, isPending } = useAuthenticator();

  if (isPending) return null;

  if (authStatus === "authenticated") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Text>{user?.signInDetails?.loginId}</Text>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="native:w-72 w-64">
          <DropdownMenuLabel>User Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onPress={signOut} variant="outline">
              <Text>Log out</Text>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <View className="mr-2">
      <Link href="/login">ログイン</Link>
    </View>
  );
}
