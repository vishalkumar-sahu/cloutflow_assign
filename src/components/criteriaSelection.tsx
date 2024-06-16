import React, {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Slider, Form, Switch } from "antd";
import { setCriteria } from "../features/influencers/influencerSlice";
import { RootState } from "../app/store";

const CriteriaSelection: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { criteria } = useSelector((state: RootState) => state.influencer);

  const [cost, setCost] = useState(criteria.cost !== undefined ? criteria.cost : [0, 50000]);
  const [rating, setRating] = useState(criteria.rating !== undefined ? criteria.rating : [0, 5]);
  const [followers, setFollowers] = useState(criteria.followers !== undefined ? criteria.followers : [0, 250000]);
  const [avilablity, setAvilablity] = useState(criteria.avilablity !== undefined ? criteria.avilablity : false);

  const onFinish = (values: any) => {
    dispatch(setCriteria(values));
  };

  useEffect(() => {
    form.setFieldsValue({
      cost,
      rating,
      followers,
      avilablity: criteria.avilablity || false,
    });
  }, [cost, rating, followers, form, criteria.avilablity]);

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="cost" label="Cost of Influencer">
          <Slider
            range
            max={50000}
            step={1000}
            value={cost}
            onChange={setCost}
          />
        </Form.Item>
        <Form.Item name="rating" label="Rating">
          <Slider
            range
            max={5}
            step={0.1}
            value={rating}
            onChange={setRating}
          />
        </Form.Item>
        <Form.Item name="followers" label="Followers">
          <Slider
            range
            max={250000}
            step={1000}
            value={followers}
            onChange={setFollowers}
          />
        </Form.Item>
        <Form.Item
          name="avilablity"
          label="Only show available influencers"
          valuePropName="checked"
        >
          <Switch checked={avilablity} onChange={setAvilablity} onClick={setAvilablity} />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          Search
        </Button>
      </Form>
    </>
  );
};

export default CriteriaSelection;
