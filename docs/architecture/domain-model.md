# Domain Model

## Core Domain Concepts

### User
- Represents a user in the system
- Properties:
  - id: Unique identifier
  - email: User's email address
  - name: User's full name
  - role: User's role in the system

### Task
- Represents a task or todo item
- Properties:
  - id: Unique identifier
  - title: Task title
  - description: Task description
  - status: Task status (TODO, IN_PROGRESS, DONE)
  - priority: Task priority (LOW, MEDIUM, HIGH)
  - dueDate: Task due date
  - assignedTo: User assigned to the task
  - createdBy: User who created the task

### Project
- Represents a project containing multiple tasks
- Properties:
  - id: Unique identifier
  - name: Project name
  - description: Project description
  - tasks: List of tasks
  - members: List of project members
  - owner: Project owner

## Domain Events

### TaskCreated
- Triggered when a new task is created
- Properties:
  - taskId: ID of the created task
  - createdBy: User who created the task
  - timestamp: Creation timestamp

### TaskAssigned
- Triggered when a task is assigned to a user
- Properties:
  - taskId: ID of the assigned task
  - assignedTo: User assigned to the task
  - assignedBy: User who made the assignment
  - timestamp: Assignment timestamp

### TaskStatusChanged
- Triggered when a task's status changes
- Properties:
  - taskId: ID of the task
  - oldStatus: Previous status
  - newStatus: New status
  - changedBy: User who changed the status
  - timestamp: Change timestamp

## Value Objects

### TaskStatus
- Enumeration of possible task statuses
- Values:
  - TODO
  - IN_PROGRESS
  - DONE

### Priority
- Enumeration of task priorities
- Values:
  - LOW
  - MEDIUM
  - HIGH

### Email
- Value object representing an email address
- Properties:
  - address: String
- Validation:
  - Must be a valid email format
  - Must not be empty

## Aggregates

### Project Aggregate
- Root: Project
- Entities:
  - Task
- Value Objects:
  - TaskStatus
  - Priority
- Invariants:
  - A task must belong to exactly one project
  - A project must have at least one member
  - Only project members can be assigned to tasks

### User Aggregate
- Root: User
- Value Objects:
  - Email
- Invariants:
  - Email must be unique
  - User must have a valid email 