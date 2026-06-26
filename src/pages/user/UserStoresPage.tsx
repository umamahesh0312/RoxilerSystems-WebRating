import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { UserLayout } from '@/layouts/UserLayout';
import { SearchBar } from '@/components/SearchBar';
import { RatingStars } from '@/components/RatingStars';
import { PaginationComponent } from '@/components/PaginationComponent';
import storeService from '@/services/storeService';
import ratingService from '@/services/ratingService';
import { Store } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export const UserStoresPage: React.FC = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [ratingModal, setRatingModal] = useState<{ open: boolean; storeId?: string; score?: number }>({ open: false });
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    loadStores();
  }, [currentPage, search]);

  const loadStores = async () => {
    try {
      setLoading(true);
      const response = await storeService.getStoresForUser({
        search,
        page: currentPage,
        pageSize: 6,
      });

      setStores(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRatingModal = (storeId: string, currentScore?: number) => {
    setRatingModal({
      open: true,
      storeId,
      score: currentScore || 0,
    });
  };

  const handleSubmitRating = async () => {
    if (ratingModal.storeId && ratingModal.score && user) {
      try {
        setSubmittingRating(true);
        if (stores.find((store) => store.id === ratingModal.storeId)?.userRating) {
          await ratingService.updateRating(ratingModal.storeId, ratingModal.score);
        } else {
          await ratingService.submitRating({
            storeId: ratingModal.storeId,
            score: ratingModal.score,
          });
        }
        setRatingModal({ open: false });
        loadStores();
      } catch (error) {
        console.error('Failed to submit rating:', error);
      } finally {
        setSubmittingRating(false);
      }
    }
  };

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Browse Stores
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <SearchBar
              placeholder="Search by store name or address..."
              onSearch={setSearch}
              fullWidth
            />
          </CardContent>
        </Card>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : stores.length === 0 ? (
          <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
            No stores found
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {stores.map((store) => (
                <Grid item xs={12} sm={6} md={4} key={store.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {store.storeName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {store.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {store.address}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                          Overall Rating:
                        </Typography>
                        <RatingStars value={store.averageRating} readOnly showValue />
                      </Box>
                      {store.userRating !== null && store.userRating !== undefined && (
                        <Box sx={{ mb: 2, p: 1, backgroundColor: '#f3f4f6', borderRadius: 1 }}>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                            Your Rating:
                          </Typography>
                          <RatingStars value={store.userRating} readOnly showValue />
                        </Box>
                      )}
                      <Button
                        fullWidth
                        variant={store.userRating ? 'outlined' : 'contained'}
                        startIcon={store.userRating ? <EditIcon /> : <AddIcon />}
                        onClick={() =>
                          handleOpenRatingModal(store.id, store.userRating ?? undefined)
                        }
                      >
                        {store.userRating ? 'Edit Rating' : 'Submit Rating'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        <Dialog
          open={ratingModal.open}
          onClose={() => setRatingModal({ open: false })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Submit Rating</DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <RatingStars
                value={ratingModal.score || 0}
                onChange={(score) =>
                  setRatingModal({ ...ratingModal, score })
                }
                size="large"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRatingModal({ open: false })}>Cancel</Button>
            <Button
              onClick={handleSubmitRating}
              variant="contained"
              disabled={!ratingModal.score || submittingRating}
            >
              {submittingRating ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </UserLayout>
  );
};

export default UserStoresPage;
