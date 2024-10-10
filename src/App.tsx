import { PlayerList } from "./Players/PlayerList.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();


export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <PlayerList/>
        </QueryClientProvider>
    );
};