export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'completed' | 'pending' ;
    createdAt:Date
}

export interface TaskResponse {
    tasks: Task[];
}

