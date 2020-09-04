export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: ""
    },
    {
      title: "Desk Evaluation",
      htmlBefore: '<i class="material-icons">filter_9_plus</i>',
      htmlAfter: '<i class="material-icons">arrow_drop_down</i>',
      to: "#",
      child: [
        {
          title: "Dosen Pembina",
          to: "/student/topic-selection/new"
        },
        {
          title: "Dosen Reviewer",
          to: "/student/topic-selection/status"
        }
      ]
    },
    {
      title: "TA Selection",
      htmlBefore: '<i class="material-icons">group</i>',
      htmlAfter: '<i class="material-icons">arrow_drop_down</i>',
      to: "#",
      child: [
        {
          title: "Daftar Topik",
          to: "/topics"
        },
        {
          title: "Buat Topik",
          to: "/lecturer/topic/new"
        },
        {
          title: "Daftar Topik Anda",
          to: "/lecturer/topics"
        },
        {
          title: "Setujui",
          to: "/lecturer/topic-approvals"
        }
      ]
    },
    {
      title: "Metode Penelitian",
      htmlBefore: '<i class="material-icons">library_books</i>',
      htmlAfter: '<i class="material-icons">arrow_drop_down</i>',
      to: "#",
      child: [
        {
          title: "Dosen Metlit",
          to: "/student/topic-selection/new"
        },
        {
          title: "Koor Metlit",
          to: "/student/topic-selection/status"
        }
      ]
    }
  ];
}
