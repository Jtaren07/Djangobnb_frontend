'use client'

import { getUserId } from "../lib/actions"
import apiService from "../services/apiService";
import React, { useEffect, useState } from "react";
import Conversation from "../components/inbox/Conversation";

export type UserType = {
    id: string;
    name: string;
    avatar: string | null;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const InboxPage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const id = await getUserId();
            setUserId(id);

            if (id) {
                const data = await apiService.get('/api/chats/');
                setConversations(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
                <p>Loading...</p>
            </main>
        );
    }

    if (!userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
                <p>You need to be authenticated to view this page.</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl ">Inbox</h1>

            {conversations.map((conversation: ConversationType) => (
                <Conversation 
                    key={conversation.id}
                    userId={userId}
                    conversation={conversation}
                />
            ))}
        </main>
    );
};
export default InboxPage;