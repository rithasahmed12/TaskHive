import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Badge, Space } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Task } from '../types/tasksTypes';
import { updateTask } from '../api/tasksApi';

interface TaskItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onUpdate: (task: Task) => void;
}

interface EditForm {
    title: string;
    description: string;
    status: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [form] = Form.useForm<EditForm>();

    const handleUpdate = (values: EditForm) => {
        const updatedTask: Task = {
            ...task,
            title: values.title,
            description: values.description,
            status: values.status as 'completed' | 'pending'
        };
        onUpdate(updatedTask);
        setIsEditModalVisible(false);
    };

    const handleStatusToggle = async () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        const updatedTask: Task = {
            ...task,
            status: newStatus,
        };

        try {
            await updateTask(task._id, updatedTask); 
            onUpdate(updatedTask);
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    const showEditModal = () => {
        form.setFieldsValue({
            title: task.title,
            description: task.description,
            status: task.status
        });
        setIsEditModalVisible(true);
    };

    const getStatusBadge = () => {
        return task.status === 'completed' ? (
            <Badge
                status="success"
                text="Completed"
            />
        ) : (
            <Badge
                status="warning"
                text="Pending"
            />
        );
    };

    return (
        <Card
            className="hover:shadow-lg transition-shadow duration-300 w-full" // Ensure full width for the card
            extra={getStatusBadge()}
            actions={[
                <Button
                    key="status"
                    type={task.status === 'completed' ? 'default' : 'primary'}
                    onClick={handleStatusToggle}
                >
                    {task.status === 'completed' ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
                </Button>,
                <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={showEditModal}
                    aria-label="Edit task"
                />,
                <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => setIsDeleteModalVisible(true)}
                    aria-label="Delete task"
                />
            ]}
        >
            <Card.Meta
                title={<span className="text-lg font-semibold">{task.title}</span>}
                description={
                    <div className="mt-2">
                        <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                }
            />

            {/* Edit Task Modal */}
            <Modal
                title="Edit Task"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleUpdate}
                    layout="vertical"
                    className="mt-4"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the task title!' }]}
                    >
                        <Input placeholder="Enter task title" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea 
                            rows={4} 
                            placeholder="Enter task description" 
                        />
                    </Form.Item>
        
                    <Form.Item className="flex justify-end mb-0">
                        <Space>
                            <Button onClick={() => setIsEditModalVisible(false)}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Update Task
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Task"
                open={isDeleteModalVisible}
                onOk={() => {
                    onDelete(task._id);
                    setIsDeleteModalVisible(false);
                }}
                onCancel={() => setIsDeleteModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            </Modal>
        </Card>
    );
};

export default TaskItem;
