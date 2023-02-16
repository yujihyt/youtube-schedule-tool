import { List, Skeleton, Table, Anchor} from 'antd';
import dayjs from 'dayjs';
import React, { Suspense } from 'react';
import { Page } from './components/page';
import { mockedResponse } from './mocked/mocked-response';
import { sortVideos } from './utils/sort-videos';

const {Link} = Anchor;

const App: React.FC = () => {
  const videos = sortVideos(mockedResponse);
  console.log(videos);
  return (
    <Page title="Youtube Scheduler">
      <Suspense fallback={<Skeleton />}>
        {/* <Filter filterControls={filterControls} /> */}
      </Suspense>
      <Table
        bordered
        rowKey="id"
        dataSource={videos}
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
              renderItem={(item:string) => <Link href={`https://youtube.com/watch?w=${item}`} title={item} target="_blank"></Link>}
            />)
          }}
        />
        <Table.Column
          title="Total Duration"
          dataIndex="totalDuration"
          key="totalDuration"
          responsive={["lg"]}
          ellipsis
          render={(totalDuration:number) => `${totalDuration} minutes`}
        />
      </Table>
    </Page>
  );
};

export default App;