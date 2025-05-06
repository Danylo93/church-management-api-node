import { Request, Response } from 'express';
import { UserStatusService } from '../services/userStatus.service';

const userStatusService = new UserStatusService();

export const setUserStatus = async (req: Request, res: Response) => {
  const { userId, isOnline } = req.body;
  if (typeof userId !== 'number' || typeof isOnline !== 'boolean') {
    return res.status(400).json({ error: 'Invalid request data' });
  }
  try {
    await userStatusService.setUserStatus(userId, isOnline);
    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error setting user status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserStatus = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }
  try {
    const isOnline = await userStatusService.getUserStatus(userId);
    if (isOnline === undefined) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ userId, isOnline });
    }
  } catch (error) {
    console.error('Error getting user status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};