import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FootballApp } from "./FootballApp.tsx";


const queryClient = new QueryClient();


export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <FootballApp/>
        </QueryClientProvider>
    );
};