export default function() {
  return [
    {
      title: "Dashboard",
      to: "/student/dashboard",
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: ""
    },
    {
      title: "TA Selection",
      htmlBefore: '<i class="material-icons">library_books</i>',
      htmlAfter: '<i class="material-icons">arrow_drop_down</i>',
      to: "#",
      child: [
        {
          title: "Pilih Topik",
          to: "/student/topic-selection/new"
        },
        {
          title: "Status",
          to: "/student/topic-selection/status"
        }
      ]
    },
    {
      title: "Notification",
      htmlBefore: '<i class="material-icons">notifications</i>',
      to: "/notification",
    }
  ];
}
