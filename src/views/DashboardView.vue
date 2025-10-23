<template>
  <div class="space-y-10! p-6!">
    <LineChartCard />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6!">
      <StatsCard
          title="Customers"
          value="345k"
          subtitle="Feb 1 - Apr 1 • Worldwide"
          icon="fas fa-users"
          growth="18.2%"
      />
      <StatsCard
          title="Revenue"
          value="$43,594"
          subtitle="Feb 1 - Apr 1 • Worldwide"
          icon="fas fa-cash-register"
          growth="28.4%"
      />
      <TrafficShareCard />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PageVisitsTable />
      <TotalOrders />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <TeamMembers :members="teamMembers" />
        <ProgressTrack />
      </div>

      <div class="flex flex-col gap-6">
        <RankCards class="flex-1" />
        <AcquisitionCard class="flex-[2.5]" />
      </div>
    </div>
  </div>

<!--  <Header/>-->
</template>

<script setup>
import StatsCard from '@/components/Statsrow.vue'
import TrafficShareCard from '@/components/TrafficShareChart.vue'
import LineChartCard from '@/components/LineChartCard.vue'
import PageVisitsTable from '@/components/PageVisitsTable.vue'
import TotalOrders from '@/components/TotalOrders.vue'
import TeamMembers from '@/components/TeamMembers.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import RankCards from '@/components/RankCards.vue'
import AcquisitionCard from '@/components/AcquisitionCard.vue'
// import Header from '@/components/Common/Header.vue'

const teamMembers = [
  {
    name: 'Alice Johnson',
    where:'online',
    avatar: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    actionText: '📅 Invite'
  },
  {
    name: 'Bob Smith',
    where:'in a meeting',
    avatar: `https://avatars1.githubusercontent.com/u/17858766?s=88&v=4`,
    actionText: '💬 Message'
  },
  {
    name: 'Clara White',
    where:'offline',
    avatar: `https://i.pravatar.cc/150?u=a042581f4e29026704d`,
    actionText:'📅 Invite'
  },
  {name:'Neil Sims',
    where:'online',
    avatar:`https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk`,
    actionText:'💬 Message'
  }
]
</script>
