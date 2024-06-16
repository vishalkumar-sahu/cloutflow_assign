import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInfluencersAsync,
  selectInfluencer,
} from "../features/influencers/influencerSlice";
import { AppDispatch, RootState } from "../app/store";
import { List, Button, Spin, Card, Rate, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { Influencer } from "../models/influencer";
import '../styles/influencerResults.css'

const InfluencerResults: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { influencers, criteria, loading } = useSelector(
    (state: RootState) => state.influencer
  );

  useEffect(() => {
    dispatch(fetchInfluencersAsync());
  }, [dispatch]);

  const filteredInfluencers = influencers.filter((influencer: Influencer) => {
    return (
      influencer.cost >= criteria.cost[0] &&
      influencer.cost <= criteria.cost[1] &&
      influencer.rating >= criteria.rating[0] &&
      influencer.rating <= criteria.rating[1] &&
      influencer.follower >= criteria.followers[0] &&
      influencer.follower <= criteria.followers[1] &&
      (!criteria.avilablity || influencer.avilablity)
    );
  });

  const handleSelect = (influencer: any) => {
    dispatch(selectInfluencer(influencer));
    navigate("/booking");
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={filteredInfluencers}
        renderItem={(influencer: Influencer) => (
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title={influencer.name}
            extra={
              influencer.avilablity ? (
                <Button type="primary" onClick={() => handleSelect(influencer)}>
                  Book
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handleSelect(influencer)}
                  disabled
                >
                  Book
                </Button>
              )
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span><strong>Cost : </strong>{influencer.cost}</span>
                <span><strong>Followers : </strong>{influencer.follower}</span>
              </span>
              <span style={{ float: "right" }}>
                <Flex gap="middle" vertical>
                  <Rate
                    tooltips={[
                      influencer.rating.toString(),
                      influencer.rating.toString(),
                      influencer.rating.toString(),
                      influencer.rating.toString(),
                      influencer.rating.toString(),
                    ]}
                    disabled
                    allowHalf
                    value={influencer.rating}
                    className="rating"
                  />
                </Flex>
              </span>
            </div>
          </Card>
        )}
      />
    </div>
  );
};

export default InfluencerResults;
