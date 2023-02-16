import { Skeleton, Table } from 'antd';
import React, { Suspense } from 'react';
import { Page } from './components/page';
import { mockedResponse } from './mocked/mocked-response';
import { sortVideos } from './utils/sort-videos';

const App: React.FC = () => {
  const videos = sortVideos(mockedResponse);
  console.log(JSON.stringify(videos));
  return (
    <Page title="Youtube Scheduler">
      <Suspense fallback={<Skeleton />}>
        {/* <Filter filterControls={filterControls} /> */}
      </Suspense>
      <Table
        bordered
        rowKey="id"
      >
        <Table.Column title="Date" dataIndex={["date"]} ellipsis />
        <Table.Column title="Number of Videos" dataIndex={["number"]} ellipsis width={200}/>
        <Table.Column
          title="Videos"
          dataIndex="videos"
          responsive={["md"]}
        />
        <Table.Column
          title="Total Duration"
          dataIndex="duration"
          responsive={["lg"]}
          ellipsis
        />
      </Table>
    </Page>
  );
};

export default App;