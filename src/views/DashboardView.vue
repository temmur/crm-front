<template>
  <div class="space-y-10">
    <ButtonsCard />
    <LineChartCard />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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



  <div class="min-h-screen bg-gray-100 p-8">

    <!-- Container -->
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Tour Listings</h2>

      <!-- Grid with 3 cards per row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ItemsCard
            img="https://uzbekistan.travel/storage/app/media/nargiza/cropped-images/Ark-0-0-0-0-1596541961.jpg"
            title="Ark Fortress"
            description="This is a beautiful place to visit with amazing scenery, lots of activities, and rich history. You will enjoy walking around, taking pictures, and learning more about the culture. Perfect for families and solo travelers alike!"
            :rating="4.8"
        />
        <ItemsCard
            img="https://www.artisansofleisure.com/wp-content/uploads/2024/07/Bukhara_private-Uzbekistan-tours-39-1.jpg"
            title="Stunning architecture of Uzbekistan"
            description="Outstanding spot for enjoying spending time together with your friends. There you can find: pleasent and thrilling atmosphere"
            :rating="3.6"
        />
        <ItemsCard
            img="https://ychef.files.bbci.co.uk/976x549/p0h44pk7.jpg"
            title="Central Asia's glittering new Silk Road"
            description="Walk through the ancient cities of Uzbekistan and the history of Silk Road, which helps you to lift your spirits "
            :rating="4.9"
        />
        <ItemsCard
            img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/53/92/b8/all-lit-up.jpg?w=900&h=500&s=1"
            title="Samarkand registan"
            description="Visit Registan in Samarkand, admire its stunning madrasahs, intricate mosaics, and rich history that tell the story of this ancient Silk Road City."
            :rating="4.7"
        />
        <ItemsCard
            img="https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/07/03/0db0b7710e16d901683367742145160b_1000x1000.jpg"
            title="The statue of Amir Temur"
            description="Explore the iconic spots of our country and observe pictureque monuments of our ancestors that reflect the rich history and culture of Uzbekistan."
            :rating="4.2"
        />
        <ItemsCard
            img="https://safartime.uz/thumb/2/SRbKVMpYqQZhAkegoVqg0g/1200r/d/dvorets-khudoyar-khana-v-kokande.webp"
            title="Palace of Khudáyár Khán Fergana Valley Geography"
            description="Delve into the rich history of Fergana Valley by visiting the Palace of KhuDayar Knon, an outstanding architectural gem that showcases the region's cultural heritage."
            :rating="4.5"
        />
      </div>
    </div>
  </div>

  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-lg font-bold mb-2">AI Chat</h2>
    <ChatLocal />
  </div>
  <div class="p-4">
    <CTodoList/>
  </div>
</template>
<script setup>



import ItemsCard from '@/components/Charts/ItemsCard.vue'
import ChatLocal from '../components/ChatLocal.vue'
import CTodoList from '@/components/ CTodoList.vue'
const teamMembers = [
  { name: 'Alice Johnson', where: 'online', avatar: 'https://i.pravatar.cc/150?u=fake@pravatar.com', actionText: '📅 Invite' },
  { name: 'Bob Smith', where: 'in a meeting', avatar: 'https://avatars1.githubusercontent.com/u/17858766?s=88&v=4', actionText: '💬 Message' },
  { name: 'Clara White', where: 'offline', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', actionText: '📅 Invite' },
  { name: 'Neil Sims', where: 'online', avatar: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk', actionText: '💬 Message' }
]

const progressItems = [
  { name: "Task A", progress: 70, color: "bg-sky-500" },
  { name: "Task B", progress: 45, color: "bg-green-500" },
  { name: "Task C", progress: 90, color: "bg-yellow-500" },
  { name: "Task D", progress: 30, color: "bg-red-500" },
]

const rankItems = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 90 },
  { name: "Clara", score: 85 },
]

const acquisitionItems = [
  { source: "Google", value: 1200 },
  { source: "Facebook", value: 900 },
  { source: "Twitter", value: 400 },
]
</script>
