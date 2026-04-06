// Authentication module for Rinjani Portal
// Contains mock user data and authentication logic

export interface User {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  name: string;
  role: "Admin" | "User";
  department: string;
  position: string;
  employeeId: string;
}

// Mock users with email and password
export const MOCK_USERS: User[] = [
  {
    id: "user-001",
    email: "admin@injourney.co.id",
    password: "Admin123!",
    name: "Raka Pradana Putra",
    role: "Admin",
    department: "Technology",
    position: "Senior Software Engineer",
    employeeId: "EMP-INJ-0000000001"
  },
  {
    id: "user-002",
    email: "user@injourney.co.id",
    password: "User123!",
    name: "Siti Nurhaliza",
    role: "User",
    department: "Human Resources",
    position: "HR Manager",
    employeeId: "EMP-INJ-0000000002"
  }
];

export interface AuthResult {
  success: boolean;
  user?: User;
  message?: string;
}

// Login function
export function login(email: string, password: string): AuthResult {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    return {
      success: true,
      user: {
        ...user,
        password: "" // Don't return password
      }
    };
  }
  
  return {
    success: false,
    message: "Invalid email or password"
  };
}

// Get user by email
export function getUserByEmail(email: string): User | undefined {
  return MOCK_USERS.find(u => u.email === email);
}

// Validate session (mock - in production would check JWT or session token)
export function validateSession(userId: string): User | null {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (user) {
    return {
      ...user,
      password: "" // Don't return password
    };
  }
  return null;
}
