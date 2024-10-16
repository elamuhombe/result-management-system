//src/tests/AuthService.test.ts
import AuthService from '../services/AuthService';
import AuthRepository from '../services/repositories/AuthRepository';
import { IUser } from '../types/types';

// Mock the AuthRepository
jest.mock('../services/repositories/AuthRepository');

describe('AuthService', () => {
  const mockStudentUser: Partial<IUser> = {
    username: 'studentUser',
    password: 'password123',
    role: 'Student',
  };

  const mockAdminUser: Partial<IUser> = {
    username: 'adminUser',
    password: 'adminPassword123',
    role: 'Admin',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new student user if the username does not exist', async () => {
    // Mock repository methods
    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(null);
    (AuthRepository.prototype.createUser as jest.Mock).mockResolvedValue(mockStudentUser);

    const authService = new AuthService();
    const result = await authService.registerUser(mockStudentUser);

    expect(result).toEqual(mockStudentUser);
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith('studentUser');
    expect(AuthRepository.prototype.createUser).toHaveBeenCalledWith(mockStudentUser);
  });

  it('should register a new admin user if the username does not exist', async () => {
    // Mock repository methods
    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(null);
    (AuthRepository.prototype.createUser as jest.Mock).mockResolvedValue(mockAdminUser);

    const authService = new AuthService();
    const result = await authService.registerUser(mockAdminUser);

    expect(result).toEqual(mockAdminUser);
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith('adminUser');
    expect(AuthRepository.prototype.createUser).toHaveBeenCalledWith(mockAdminUser);
  });

  it('should throw an error if the username already exists', async () => {
    // Mock the existing user
    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(mockStudentUser);

    const authService = new AuthService();

    await expect(authService.registerUser(mockStudentUser)).rejects.toThrow("User already exists");
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith('studentUser');
    expect(AuthRepository.prototype.createUser).not.toHaveBeenCalled();
  });

  it('should return user data if the student user exists', async () => {
    const username = 'studentUser';
    const userData: IUser = {
      username: 'studentUser',
      password: 'hashedPassword',
      role: 'Student',
    };

    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(userData);

    const authService = new AuthService();
    const result = await authService.getUserByUsername(username);

    expect(result).toEqual(userData);
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith(username);
  });

  it('should return user data if the admin user exists', async () => {
    const username = 'adminUser';
    const userData: IUser = {
      username: 'adminUser',
      password: 'hashedPassword',
      role: 'Admin',
    };

    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(userData);

    const authService = new AuthService();
    const result = await authService.getUserByUsername(username);

    expect(result).toEqual(userData);
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith(username);
  });

  it('should return null if the student user does not exist', async () => {
    const username = 'nonexistentStudentUser';

    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(null);

    const authService = new AuthService();
    const result = await authService.getUserByUsername(username);

    expect(result).toBeNull();
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith(username);
  });

  it('should return null if the admin user does not exist', async () => {
    const username = 'nonexistentAdminUser';

    (AuthRepository.prototype.findUserByUsername as jest.Mock).mockResolvedValue(null);

    const authService = new AuthService();
    const result = await authService.getUserByUsername(username);

    expect(result).toBeNull();
    expect(AuthRepository.prototype.findUserByUsername).toHaveBeenCalledWith(username);
  });
});
