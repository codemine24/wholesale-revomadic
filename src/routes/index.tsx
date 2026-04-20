import { useRoutes } from "react-router";
import { Portal } from "@/components/layout/portal";
import { HomeScreen } from "@/screens/home";

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Portal />,
            children: [
                {
                    index: true,
                    element: <HomeScreen />,
                }
            ]
        }
    ])
}