export class TaskSerialize {
  dbToResponseGet(task: any) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      User: {
        userId: task.userId,
        name: task.User.name,
        email: task.User.email,
      },
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
