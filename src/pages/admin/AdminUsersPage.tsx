import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Stack,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AdminLayout } from '@/layouts/AdminLayout';
import { SearchBar } from '@/components/SearchBar';
import { DataTable, Column, Action } from '@/components/DataTable';
import { PaginationComponent } from '@/components/PaginationComponent';
import adminService from '@/services/adminService';
import { User, FilterOptions } from '@/types';

export const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; userId?: string }>({ open: false });

  useEffect(() => {
    loadUsers();
  }, [currentPage, search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const filters: FilterOptions = {
        search,
        page: currentPage,
        pageSize: 10,
      };
      const response = await adminService.getUsers(filters);
      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirm.userId) {
      try {
        await adminService.deleteUser(deleteConfirm.userId);
        setDeleteConfirm({ open: false });
        loadUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const columns: Column<User>[] = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    { id: 'role', label: 'Role' },
  ];

  const actions: Action<User>[] = [
    {
      label: 'View',
      onClick: (user) => navigate(`/admin/users/${user.id}`),
      color: 'primary',
    },
    {
      label: 'Delete',
      onClick: (user) => setDeleteConfirm({ open: true, userId: user.id }),
      color: 'error',
    },
  ];

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Users
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/add-user')}
          >
            Add User
          </Button>
        </Stack>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SearchBar
              placeholder="Search by name or email..."
              onSearch={setSearch}
              fullWidth
            />
          </CardContent>
        </Card>

        <DataTable
          columns={columns}
          data={users}
          actions={actions}
          loading={loading}
          emptyMessage="No users found"
        />

        {totalPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <Dialog
          open={deleteConfirm.open}
          onClose={() => setDeleteConfirm({ open: false })}
        >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirm({ open: false })}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default AdminUsersPage;
