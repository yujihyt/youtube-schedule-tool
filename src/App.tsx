import { List, Skeleton, Table, Anchor, Typography} from 'antd';
import dayjs from 'dayjs';
import React, { Suspense, useState } from 'react';
import { Filter } from './components/filter';
import { Page } from './components/page';
import { mockedResponse } from './mocked/mocked-response';
import { sortVideos } from './utils/sort-videos';

const {Title} = Typography;
const {Link} = Anchor;

const initialState = {
  sunday: 0,
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
};

const App: React.FC = () => {
  const [daysOfWeek, setDaysOfWeek] = useState(initialState);
  const [videos, setVideos] = useState(sortVideos(mockedResponse, daysOfWeek));
  
  return (
    <Page title="Youtube Scheduler">
      <Suspense fallback={<Skeleton />}>
        <Filter setVideos={setVideos} setDaysOfWeek={setDaysOfWeek} daysOfWeek={daysOfWeek} />
      </Suspense>
      <Title level={4}>It would take {videos.length} days to finish the list</Title>
      <Table
        bordered
        rowKey="id"
        dataSource={videos}
        pagination={{total: videos.length, showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`}}
      >
        <Table.Column title="Date" dataIndex="date" key="date" ellipsis render={(date: string) => dayjs(date).format("DD/MM/YYYY")}/>
        <Table.Column title="Number of Videos" dataIndex="numberOfVideos" key="numberOfVideos" ellipsis width={200} render={(numberOfVideos: number) => numberOfVideos}/>
        <Table.Column
          title="Videos"
          dataIndex="videos"
          key="videos"
          responsive={["md"]}
          render={(videos) => {
            return (<List
              size="small"
              bordered
              dataSource={videos}
              renderItem={(item:string) => <Link href={`https://youtube.com/watch?v=${item}`} title={item} target="_blank"></Link>}
            />)
          }}
        />
        <Table.Column
          title="Total Duration"
          dataIndex="totalDuration"
          key="totalDuration"
          responsive={["lg"]}
          ellipsis
          render={(totalDuration:number) => `${totalDuration} seconds`}
        />
      </Table>
    </Page>
  );
};

export default App;
