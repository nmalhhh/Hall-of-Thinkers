/**
 * SCULPTURES — The Hall of Thinkers
 * 9 entries mapped to local .glb files in public/models/
 *
 * getModelUrl() uses import.meta.env.BASE_URL (injected by Vite at build time)
 * and collapses any accidental double-slashes, so paths are always correct:
 *   - Dev local:   /models/socrates.glb
 *   - GitHub Pages: /Hall-of-Thinkers/models/socrates.glb
 *
 * Aligned with MLN111 curriculum (Chương 1, 2, 3 — NXB Chính trị quốc gia Sự thật)
 */
const getModelUrl = (fileName) =>
  `${import.meta.env.BASE_URL}models/${fileName}`.replace(/\/+/g, '/');

export const SCULPTURES = [
  {
    id: 'socrates',
    name: 'Socrates (Xô-crát)',
    period: 'Hy Lạp Cổ đại (470 – 399 TCN)',
    doctrine: 'Triết học Nhân sinh & Phương pháp Đối thoại Phản biện',
    quote: 'Hãy tự biết chính mình.',
    summary:
      'Chuyển trọng tâm triết học từ giới tự nhiên sang bản thể con người và phương pháp truy vấn chân lý biện chứng.',
    accentColor: '#f97316',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Socrate_du_Louvre.jpg/480px-Socrate_du_Louvre.jpg',
    modelUrl: getModelUrl('socrates.glb'),
    hotspots: [
      {
        id: 's1',
        position: [0, 0.65, 0.6],
        title: 'Vấn đề Bản thể Con người',
        description:
          'Đặt con người và đời sống thực tiễn làm trung tâm của nhận thức triết học, tiền đề cho các tranh luận duy vật – duy tâm sau này.',
      },
      {
        id: 's2',
        position: [0.25, 0.05, 0.65],
        title: 'Nghệ thuật Hộ sinh (Maieutics)',
        description:
          'Phương pháp truy vấn đối thoại biện chứng để khám phá bản chất sự vật — cha đẻ của tư duy phản biện có hệ thống.',
      },
    ],
  },
  {
    id: 'plato',
    name: 'Plato (Pla-tôn)',
    period: 'Hy Lạp Cổ đại (427 – 347 TCN)',
    doctrine: 'Chủ nghĩa Duy tâm Khách quan',
    quote: 'Thế giới cảm tính chỉ là cái bóng phản chiếu của thế giới ý niệm.',
    summary:
      "Người khởi xướng đường lối Platôn; khẳng định bản nguyên tối cao của thế giới là 'Thế giới Ý niệm' phi vật chất.",
    accentColor: '#3b82f6',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg/480px-Plato_Silanion_Musei_Capitolini_MC1377.jpg',
    modelUrl: getModelUrl('plato.glb'),
    hotspots: [
      {
        id: 'p1',
        position: [0, 0.6, 0.6],
        title: 'Thế giới Ý niệm',
        description:
          'Bản chất chân thực của tồn tại là thế giới ý niệm vĩnh hằng; thế giới vật chất chỉ là cái bóng không hoàn hảo của ý niệm.',
      },
      {
        id: 'p2',
        position: [-0.25, -0.05, 0.65],
        title: 'Dụ ngôn Hang đá',
        description:
          'Minh họa nhận thức cảm tính hạn hẹp của con người nếu không đạt tới tư duy trừu tượng — không thể nhìn thấy thực tại đích thực.',
      },
    ],
  },
  {
    id: 'aristotle',
    name: 'Aristotle (A-rít-xtốt)',
    period: 'Hy Lạp Cổ đại (384 – 322 TCN)',
    doctrine: 'Dao động CNDV & CNDT – Đỉnh cao Bách khoa Cổ đại',
    quote: 'Plato là thầy, nhưng chân lý quý hơn.',
    summary:
      'Nhà tư tưởng bách khoa lớn nhất thời cổ đại; đặt nền móng cho Logic học hình thức và phân tích bản thể luận.',
    accentColor: '#10b981',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/480px-Aristotle_Altemps_Inv8575.jpg',
    modelUrl: getModelUrl('aristotle.glb'),
    hotspots: [
      {
        id: 'a1',
        position: [0, 0.58, 0.6],
        title: 'Chất liệu & Hình thức',
        description:
          'Sự vật hình thành từ sự kết hợp giữa chất liệu (vật chất) và hình thức (bản chất) — biểu hiện dao động nhị nguyên luận đặc trưng.',
      },
      {
        id: 'a2',
        position: [0.28, 0.0, 0.65],
        title: 'Quy luật Tư duy',
        description:
          'Hệ thống hóa các quy luật tư duy logic hình thức cơ bản (tam đoạn luận) — được triết học Mác kế thừa có phê phán.',
      },
    ],
  },
  {
    id: 'hegel',
    name: 'G.W.F. Hegel (Hê-ghen)',
    period: 'Triết học Cổ điển Đức (1770 – 1831)',
    doctrine: 'Phép Biện chứng Duy tâm Khách quan',
    quote: 'Cái gì hợp lý thì hiện thực, cái gì hiện thực thì hợp lý.',
    summary:
      'Đỉnh cao triết học cổ điển Đức; hệ thống hóa toàn bộ các quy luật biện chứng dưới lăng kính tha hóa của Ý niệm tuyệt đối.',
    accentColor: '#a855f7',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Hegel_portrait_by_Schlesinger_1831.jpg/480px-Hegel_portrait_by_Schlesinger_1831.jpg',
    modelUrl: getModelUrl('hegel.glb'),
    hotspots: [
      {
        id: 'h1',
        position: [0, 0.62, 0.6],
        title: 'Hạt nhân Hợp lý',
        description:
          'Hệ thống 3 quy luật biện chứng duy tâm (Lượng – Chất, Mâu thuẫn, Phủ định của phủ định) được C. Mác kế thừa và cải tạo duy vật.',
      },
      {
        id: 'h2',
        position: [-0.25, 0.05, 0.68],
        title: 'Vỏ thần bí Ý niệm',
        description:
          "Hạn chế duy tâm: coi hiện thực và lịch sử loài người chỉ là sản phẩm tự nhận thức của 'Ý niệm tuyệt đối' — Mác đảo ngược triệt để.",
      },
    ],
  },
  {
    id: 'david',
    name: 'Tượng David (Triết học Nhân bản)',
    period: 'Phục hưng & Tiền đề Khai sáng',
    doctrine: 'Bản thể Con người & CNDV Nhân bản (Feuerbach)',
    quote: 'Con người là sản phẩm cao nhất của tự nhiên.',
    summary:
      'Biểu trưng cho chủ nghĩa duy vật nhân bản; giải phóng con người khỏi thần quyền nhưng còn hạn chế trừu tượng, phi lịch sử.',
    accentColor: '#eab308',
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Michelangelo%27s_David_-_right_view_2.jpg/480px-Michelangelo%27s_David_-_right_view_2.jpg",
    modelUrl: getModelUrl('david.glb'),
    hotspots: [
      {
        id: 'd1',
        position: [0, 0.68, 0.58],
        title: 'Duy vật Nhân bản',
        description:
          'Con người là thực thể tự nhiên; giải phóng tư duy khỏi sự thống trị của tôn giáo — tiền đề trực tiếp của triết học Mác.',
      },
      {
        id: 'd2',
        position: [0.25, 0.1, 0.62],
        title: 'Tính chất Trừu tượng',
        description:
          'Hạn chế của CNDV trước Mác khi chưa nhìn thấy bản chất xã hội và hoạt động thực tiễn của con người trong quan hệ sản xuất.',
      },
    ],
  },
  {
    id: 'marx',
    name: 'Karl Marx (C. Mác)',
    period: 'Thế kỷ XIX (1818 – 1883)',
    doctrine: 'Chủ nghĩa Duy vật Biện chứng & CNDV Lịch sử',
    quote:
      'Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là cải tạo thế giới.',
    summary:
      'Bước ngoặt cách mạng trong triết học: thống nhất phép biện chứng và chủ nghĩa duy vật, sáng lập CNDV lịch sử.',
    accentColor: '#ef4444',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Karl_Marx_001.jpg/480px-Karl_Marx_001.jpg',
    modelUrl: getModelUrl('marx.glb'),
    hotspots: [
      {
        id: 'm1',
        position: [0, 0.6, 0.65],
        title: 'Bước ngoặt Cách mạng',
        description:
          'Sáng tạo chủ nghĩa duy vật biện chứng hoàn bị và chủ nghĩa duy vật lịch sử — cuộc cách mạng vĩ đại nhất trong lịch sử triết học.',
      },
      {
        id: 'm2',
        position: [-0.25, 0.0, 0.7],
        title: 'Thực tiễn Cải tạo Thế giới',
        description:
          'Thực tiễn là cơ sở, động lực của nhận thức và là tiêu chuẩn của chân lý; triết học là vũ khí tư tưởng cho giai cấp vô sản.',
      },
    ],
  },
  {
    id: 'lenin',
    name: 'V.I. Lenin (V.I. Lênin)',
    period: 'Đầu Thế kỷ XX (1870 – 1924)',
    doctrine: 'Bảo vệ & Phát triển Triết học Mác',
    quote: 'Vật chất là thực tại khách quan độc lập với ý thức con người...',
    summary:
      'Định nghĩa kinh điển về phạm trù vật chất giải quyết cuộc khủng hoảng vật lý đầu thế kỷ 20; phát triển lý luận nhà nước và cách mạng vô sản.',
    accentColor: '#dc2626',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Lenin_CL.jpg/480px-Lenin_CL.jpg',
    modelUrl: getModelUrl('lenin.glb'),
    hotspots: [
      {
        id: 'l1',
        position: [0, 0.62, 0.62],
        title: 'Định nghĩa Kinh điển về Vật chất',
        description:
          '"Vật chất là một phạm trù triết học dùng để chỉ thực tại khách quan được đem lại cho con người trong cảm giác, được cảm giác chép lại, chụp lại, phản ánh, và tồn tại không lệ thuộc vào cảm giác." (V.I. Lênin)',
      },
      {
        id: 'l2',
        position: [0.25, -0.05, 0.68],
        title: 'Khủng hoảng Vật lý Đầu TK 20',
        description:
          "Phân biệt rõ ràng giữa phạm trù triết học vật chất (nhận thức luận) với cấu trúc vật lý cụ thể — bác bỏ luận điệu 'vật chất tiêu tan'.",
      },
    ],
  },
  {
    id: 'thinker',
    name: 'The Thinker (Người suy tưởng)',
    period: 'Điêu khắc A. Rodin (1904)',
    doctrine: 'Lý luận Nhận thức & Bản chất Ý thức',
    quote: 'Tư duy trừu tượng là nấc thang cao nhất đưa con người thấu suốt bản chất thế giới.',
    summary:
      'Biểu trưng cho năng lực phản ánh năng động, sáng tạo của ý thức và con đường nhận thức chân lý biện chứng.',
    accentColor: '#06b6d4',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/The_Thinker%2C_Rodin_Museum.jpg/480px-The_Thinker%2C_Rodin_Museum.jpg',
    modelUrl: getModelUrl('thinker.glb'),
    hotspots: [
      {
        id: 't1',
        position: [0, 0.45, 0.62],
        title: 'Bản chất của Ý thức',
        description:
          'Ý thức là sự phản ánh năng động, sáng tạo thế giới khách quan vào bộ óc người — không sao chép nguyên xi mà là tái tạo sáng tạo có mục đích.',
      },
      {
        id: 't2',
        position: [0.28, 0.0, 0.65],
        title: 'Con đường Nhận thức Biện chứng',
        description:
          '"Từ trực quan sinh động đến tư duy trừu tượng, và từ tư duy trừu tượng đến thực tiễn — đó là con đường biện chứng của sự nhận thức chân lý." (V.I. Lênin)',
      },
    ],
  },
  {
    id: 'prometheus',
    name: 'Prometheus (Thần Lửa)',
    period: 'Biểu tượng Triết học Cổ điển',
    doctrine: 'Chủ nghĩa Duy vật Lịch sử & Triết học Con người',
    quote: 'Ngọn lửa văn minh mở đầu cho hành trình con người cải tạo tự nhiên.',
    summary:
      'Hình tượng đại diện cho vai trò quyết định của sản xuất vật chất đối với sự tiến bộ của lịch sử loài người.',
    accentColor: '#f97316',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Prometheus_carrying_fire_%281702%29_by_Nicolas-S%C3%A9bastien_Adam_-_Louvre_MR_1744.jpg/480px-Prometheus_carrying_fire_%281702%29_by_Nicolas-S%C3%A9bastien_Adam_-_Louvre_MR_1744.jpg',
    modelUrl: getModelUrl('prometheus.glb'),
    hotspots: [
      {
        id: 'pr1',
        position: [0, 0.65, 0.6],
        title: 'Sản xuất Vật chất',
        description:
          'Sản xuất vật chất là nền tảng cơ bản đầu tiên quyết định sự tồn tại và phát triển của mọi hình thái kinh tế – xã hội trong lịch sử nhân loại.',
      },
      {
        id: 'pr2',
        position: [-0.25, 0.1, 0.65],
        title: 'Bản chất Con người',
        description:
          '"Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội." (C. Mác, Luận cương về Feuerbach, 1845)',
      },
    ],
  },
];