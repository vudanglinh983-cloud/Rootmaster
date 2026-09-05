// Web Speech API helper & comprehensive IELTS Phonetics / Pronunciation Engine

export interface PronunciationData {
  ipa: string;
  vietnameseGuide: string;
  spokenText?: string;
}

// 1. Comprehensive Root Phonetics & Pronunciation Guides (18 Trunks)
export const ROOT_PRONUNCIATION_MAP: Record<string, PronunciationData> = {
  // Trục 1: Tiền Tố Định Hướng & Biến Đổi
  "CON/COM/COL/COR-": {
    ipa: "/kɒn/, /kɒm/, /kɒl/, /kɔː/",
    vietnameseGuide: "kon • com • col • cor",
    spokenText: "con, com, col, cor"
  },
  "CON/COM-": {
    ipa: "/kɒn/, /kɒm/",
    vietnameseGuide: "kon • com",
    spokenText: "con, com"
  },
  "DIS/DI/DIF-": {
    ipa: "/dɪs/, /daɪ/, /dɪf/",
    vietnameseGuide: "đít-x • đai • đíp-ph",
    spokenText: "dis, di, dif"
  },
  "TRANS-": {
    ipa: "/trænz/, /trɑːns/",
    vietnameseGuide: "tran-x • trahn-s",
    spokenText: "trans"
  },
  "SUB/SUC/SUP/SUS-": {
    ipa: "/sʌb/, /sək/, /səp/, /səs/",
    vietnameseGuide: "xắp • xắc • xắp • xất",
    spokenText: "sub, suc, sup, sus"
  },
  "PRO-": {
    ipa: "/prəʊ/, /prɒ/",
    vietnameseGuide: "prô • pro",
    spokenText: "pro"
  },

  // Trục 2: Tư Duy, Nhận Thức & Diễn Ngôn
  "COGN/GNO": {
    ipa: "/kɒɡn/, /nəʊ/",
    vietnameseGuide: "cóc-n • nô",
    spokenText: "cogn, gno"
  },
  "SCI": {
    ipa: "/saɪ/",
    vietnameseGuide: "xai",
    spokenText: "sci"
  },
  "LOG/LOQ/LOC": {
    ipa: "/lɒɡ/, /lɒk/",
    vietnameseGuide: "lóc • loác",
    spokenText: "log, loq, loc"
  },
  "DIC/DICT": {
    ipa: "/dɪkt/",
    vietnameseGuide: "đích-t",
    spokenText: "dict"
  },
  "PHON": {
    ipa: "/fəʊn/",
    vietnameseGuide: "phôn",
    spokenText: "phone"
  },

  // Trục 3: Con Người, Quản Trị & Thể Chế
  "DEM": {
    ipa: "/dem/",
    vietnameseGuide: "đem",
    spokenText: "dem"
  },
  "CRAC/CRAT": {
    ipa: "/kræk/, /kræt/",
    vietnameseGuide: "cờ-rác • cờ-rát",
    spokenText: "crac, crat"
  },
  "JUR/JUD": {
    ipa: "/dʒʊər/, /dʒʌdʒ/",
    vietnameseGuide: "giu-ơ • giắt-d",
    spokenText: "jur, jud"
  },
  "CIV": {
    ipa: "/sɪv/",
    vietnameseGuide: "xíp-v",
    spokenText: "civ"
  },
  "ANTHROP": {
    ipa: "/ˈæn.θrəp/",
    vietnameseGuide: "an-th-rốp",
    spokenText: "anthrop"
  },

  // Trục 4: Vận Động, Biến Đổi & Thời Không
  "GEN/GENIT": {
    ipa: "/dʒen/, /ˈdʒen.ɪt/",
    vietnameseGuide: "gien • gien-nít",
    spokenText: "gen, genit"
  },
  "GEN": {
    ipa: "/dʒen/",
    vietnameseGuide: "gien",
    spokenText: "gen"
  },
  "CHRON": {
    ipa: "/krɒn/",
    vietnameseGuide: "cờ-ron",
    spokenText: "chron"
  },
  "MUT": {
    ipa: "/mjuːt/",
    vietnameseGuide: "miu-t",
    spokenText: "mute"
  },
  "GRAD/GRESS": {
    ipa: "/ɡræd/, /ɡres/",
    vietnameseGuide: "gờ-rát • gờ-rét-x",
    spokenText: "grad, gress"
  },
  "VERT/VERS": {
    ipa: "/vɜːt/, /vɜːs/",
    vietnameseGuide: "vớt-t • vớt-x",
    spokenText: "vert, vers"
  },

  // Trục 5: Xung Động, Tác Động & Buộc Ép
  "PEL/PULS": {
    ipa: "/pel/, /pʌls/",
    vietnameseGuide: "pen • pân-x",
    spokenText: "pel, puls"
  },
  "TEND/TENS/TENT": {
    ipa: "/tend/, /tens/, /tent/",
    vietnameseGuide: "ten-đ • ten-x • ten-t",
    spokenText: "tend, tens, tent"
  },
  "MIT/MISS": {
    ipa: "/mɪt/, /mɪs/",
    vietnameseGuide: "mít • mít-x",
    spokenText: "mit, miss"
  },
  "TRACT": {
    ipa: "/trækt/",
    vietnameseGuide: "trắc-t",
    spokenText: "tract"
  },

  // Trục 6: Chân Lý, Đo Lường & Chuẩn Mực
  "VER": {
    ipa: "/vɜː/",
    vietnameseGuide: "vơ",
    spokenText: "ver"
  },
  "VAL/VAIL": {
    ipa: "/væl/, /veɪl/",
    vietnameseGuide: "van • vênh-l",
    spokenText: "val, vail"
  },
  "FID": {
    ipa: "/fɪd/",
    vietnameseGuide: "phít-đ",
    spokenText: "fid"
  },
  "EQU": {
    ipa: "/ˈiː.kw/",
    vietnameseGuide: "i-qu",
    spokenText: "equ"
  },

  // Trục 7: Vị Thế, Thuộc Tính & Bền Vững
  "STA/SIST/STIT": {
    ipa: "/steɪ/, /sɪst/, /stɪt/",
    vietnameseGuide: "xtay • xít-st • x-tít",
    spokenText: "sta, sist, stit"
  },
  "SED/SID/SESS": {
    ipa: "/sed/, /sɪd/, /ses/",
    vietnameseGuide: "xét-đ • xít-đ • xét-x",
    spokenText: "sed, sid, sess"
  },
  "TEN/TIN/TAIN": {
    ipa: "/ten/, /tɪn/, /teɪn/",
    vietnameseGuide: "ten • tin • tênh",
    spokenText: "ten, tin, tain"
  },
  "HAB/HIB": {
    ipa: "/hæb/, /hɪb/",
    vietnameseGuide: "háp • híp",
    spokenText: "hab, hib"
  },

  // Trục 8: Vòng Đời & Chuyển Dịch
  "BIO": {
    ipa: "/ˈbaɪ.əʊ/",
    vietnameseGuide: "bai-ô",
    spokenText: "bio"
  },
  "MORT": {
    ipa: "/mɔːt/",
    vietnameseGuide: "mót-t",
    spokenText: "mort"
  },
  "SEQU/SECUT": {
    ipa: "/ˈsiː.kw/, /ˈsek.jʊt/",
    vietnameseGuide: "xi-qu • xéc-qu-t",
    spokenText: "sequ, secut"
  },
  "CUR/CURS": {
    ipa: "/kɜː/, /kɜːs/",
    vietnameseGuide: "cơ • cơ-x",
    spokenText: "cur, curs"
  },

  // Trục 9: Đo Lường & Chuẩn Mực
  "METR/METER": {
    ipa: "/ˈmiː.tər/",
    vietnameseGuide: "mí-tờ",
    spokenText: "meter"
  },
  "MOD": {
    ipa: "/mɒd/",
    vietnameseGuide: "mót-đ",
    spokenText: "mod"
  },
  "NUMER": {
    ipa: "/ˈnjuː.mər/",
    vietnameseGuide: "niu-mờ",
    spokenText: "numer"
  },
  "SPEC/ESTIM": {
    ipa: "/spek/, /ˈes.tɪm/",
    vietnameseGuide: "xpect • ét-s-tim",
    spokenText: "spec, estim"
  },

  // Trục 10: Xung Đột, Phòng Thủ & Đối Kháng
  "FEND/FLICT/BELL/FUG/PUGN": {
    ipa: "/fend/, /flɪkt/, /bel/, /fjuːɡ/, /pʌɡn/",
    vietnameseGuide: "phen-đ • phờ-lích-t • beo • phiu-g • pắc-n",
    spokenText: "fend, flict, bell, fug, pugn"
  },
  "FEND": {
    ipa: "/fend/",
    vietnameseGuide: "phen-đ",
    spokenText: "fend"
  },
  "FLICT": {
    ipa: "/flɪkt/",
    vietnameseGuide: "phờ-lích-t",
    spokenText: "flict"
  },
  "BELL": {
    ipa: "/bel/",
    vietnameseGuide: "beo",
    spokenText: "bell"
  },
  "FUG": {
    ipa: "/fjuːɡ/",
    vietnameseGuide: "phiu-g",
    spokenText: "fug"
  },
  "PUGN": {
    ipa: "/pʌɡn/",
    vietnameseGuide: "pắc-n",
    spokenText: "pugn"
  },

  // Trục 11: Phân Bổ, Sở Hữu & Trách Nhiệm
  "TRIB/MUN/PROPR/COMMUN": {
    ipa: "/trɪb/, /mjuːn/, /ˈprəʊ.pr/, /ˈkɒm.juːn/",
    vietnameseGuide: "truy-b • miun • prô-pr • com-miun",
    spokenText: "trib, mun, propr, commun"
  },
  "TRIB": {
    ipa: "/trɪb/",
    vietnameseGuide: "truy-b",
    spokenText: "trib"
  },
  "MUN": {
    ipa: "/mjuːn/",
    vietnameseGuide: "miun",
    spokenText: "mun"
  },
  "PROPR": {
    ipa: "/ˈprəʊ.pr/",
    vietnameseGuide: "prô-pr",
    spokenText: "proper"
  },
  "COMMUN": {
    ipa: "/ˈkɒm.juːn/",
    vietnameseGuide: "com-miun",
    spokenText: "commune"
  },

  // Trục 12: Đích Đến, Dự Phán & Ý Hướng
  "FIN/OPT/SPECT/TEND": {
    ipa: "/fɪn/, /ɒpt/, /spekt/, /tend/",
    vietnameseGuide: "phin • óp-t • xpect • ten-đ",
    spokenText: "fin, opt, spect, tend"
  },
  "FIN": {
    ipa: "/fɪn/",
    vietnameseGuide: "phin",
    spokenText: "fin"
  },
  "OPT": {
    ipa: "/ɒpt/",
    vietnameseGuide: "óp-t",
    spokenText: "opt"
  },
  "SPECT": {
    ipa: "/spekt/",
    vietnameseGuide: "xpect",
    spokenText: "spect"
  },
  "TEND": {
    ipa: "/tend/",
    vietnameseGuide: "ten-đ",
    spokenText: "tend"
  },

  // Trục 13: Gắn Kết, Liên Tục & Thắt Chặt
  "NEX/LIG/SER/APT": {
    ipa: "/neks/, /lɪɡ/, /ˈsɪə.riːz/, /æpt/",
    vietnameseGuide: "néc-x • lích-g • xi-ri • áp-t",
    spokenText: "nex, lig, ser, apt"
  },
  "NEX": {
    ipa: "/neks/",
    vietnameseGuide: "néc-x",
    spokenText: "nex"
  },
  "LIG": {
    ipa: "/lɪɡ/",
    vietnameseGuide: "lích-g",
    spokenText: "lig"
  },
  "SER": {
    ipa: "/ˈsɪə.riːz/",
    vietnameseGuide: "xi-ri",
    spokenText: "ser"
  },
  "APT": {
    ipa: "/æpt/",
    vietnameseGuide: "áp-t",
    spokenText: "apt"
  },

  // Trục 14: Lợi Ích, Phương Hại & Tính Thiện Ác
  "BEN/MAL/NOX/DAMN/DETRI": {
    ipa: "/ben/, /mæl/, /nɒks/, /dæm/, /ˈdet.rɪ/",
    vietnameseGuide: "ben • man • nóc-x • đam • đét-tri",
    spokenText: "ben, mal, nox, damn, detri"
  },
  "BEN": {
    ipa: "/ben/",
    vietnameseGuide: "ben",
    spokenText: "ben"
  },
  "BENE": {
    ipa: "/ˈben.i/",
    vietnameseGuide: "bén-ni",
    spokenText: "bene"
  },
  "MAL": {
    ipa: "/mæl/",
    vietnameseGuide: "man",
    spokenText: "mal"
  },
  "NOX": {
    ipa: "/nɒks/",
    vietnameseGuide: "nóc-x",
    spokenText: "nox"
  },
  "DAMN": {
    ipa: "/dæm/",
    vietnameseGuide: "đam",
    spokenText: "damn"
  },
  "DETRI": {
    ipa: "/ˈdet.rɪ/",
    vietnameseGuide: "đét-tri",
    spokenText: "detri"
  },

  // Trục 15: Đầy Đủ, Thiếu Hụt & Dư Thừa
  "PLE/VAC/PAUC/PLEN": {
    ipa: "/pliː/, /væk/, /pɔːk/, /plen/",
    vietnameseGuide: "pli • vác • poóc • plen",
    spokenText: "ple, vac, pauc, plen"
  },
  "PLE": {
    ipa: "/pliː/",
    vietnameseGuide: "pli",
    spokenText: "ple"
  },
  "VAC": {
    ipa: "/væk/",
    vietnameseGuide: "vác",
    spokenText: "vac"
  },
  "PAUC": {
    ipa: "/pɔːk/",
    vietnameseGuide: "poóc",
    spokenText: "pauc"
  },
  "PLEN": {
    ipa: "/plen/",
    vietnameseGuide: "plen",
    spokenText: "plen"
  },

  // Trục 16: Dẫn Dắt, Quản Trị & Thực Thi
  "DUC/DUCT/REG/RECT": {
    ipa: "/dʌk/, /dʌkt/, /redʒ/, /rekt/",
    vietnameseGuide: "đắc • đắc-t • rét-gi • réc-t",
    spokenText: "duc, duct, reg, rect"
  },
  "DUC": {
    ipa: "/dʌk/",
    vietnameseGuide: "đắc",
    spokenText: "duc"
  },
  "DUCT": {
    ipa: "/dʌkt/",
    vietnameseGuide: "đắc-t",
    spokenText: "duct"
  },
  "REG": {
    ipa: "/redʒ/",
    vietnameseGuide: "rét-gi",
    spokenText: "reg"
  },
  "RECT": {
    ipa: "/rekt/",
    vietnameseGuide: "réc-t",
    spokenText: "rect"
  },

  // Trục 17: Biến Đổi Hình Thái, Thích Nghi & Dị Thường
  "MORPH/MUT/ALTER/VAR": {
    ipa: "/mɔːf/, /mjuːt/, /ˈɔːl.tər/, /veər/",
    vietnameseGuide: "mót-ph • miu-t • on-tờ • ve-ơ",
    spokenText: "morph, mute, alter, var"
  },
  "MORPH": {
    ipa: "/mɔːf/",
    vietnameseGuide: "mót-ph",
    spokenText: "morph"
  },
  "ALTER": {
    ipa: "/ˈɔːl.tər/",
    vietnameseGuide: "on-tờ",
    spokenText: "alter"
  },
  "VAR": {
    ipa: "/veər/",
    vietnameseGuide: "ve-ơ",
    spokenText: "var"
  },

  // Trục 18: Minh Bạch, Hiện Hữu & Ẩn Tàng
  "LUC/LUM/PHAN/CRYPT/MANI": {
    ipa: "/luːs/, /lʌm/, /fæn/, /krɪpt/, /ˈmæn.ɪ/",
    vietnameseGuide: "lút-x • lăm • phan • cờ-ríp-t • man-ni",
    spokenText: "luc, lum, phan, crypt, mani"
  },
  "LUC": {
    ipa: "/luːs/",
    vietnameseGuide: "lút-x",
    spokenText: "luc"
  },
  "LUM": {
    ipa: "/lʌm/",
    vietnameseGuide: "lăm",
    spokenText: "lum"
  },
  "PHAN": {
    ipa: "/fæn/",
    vietnameseGuide: "phan",
    spokenText: "phan"
  },
  "CRYPT": {
    ipa: "/krɪpt/",
    vietnameseGuide: "cờ-ríp-t",
    spokenText: "crypt"
  },
  "MANI": {
    ipa: "/ˈmæn.ɪ/",
    vietnameseGuide: "man-ni",
    spokenText: "mani"
  },
};

// 2. Comprehensive Word Phonetic Dictionary (fallback and enrichment)
export const WORD_PHONETICS_DICT: Record<string, { ipa: string; guide: string }> = {
  // Trục 1 & Common C1/C2
  "Consolidate": { ipa: "/kənˈsɒl.ɪ.deɪt/", guide: "cần-xo-li-đây-t" },
  "Contaminate": { ipa: "/kənˈtæm.ɪ.neɪt/", guide: "cần-ta-mi-nây-t" },
  "Combustion": { ipa: "/kəmˈbʌs.tʃən/", guide: "cầm-bát-s-chần" },
  "Coherent": { ipa: "/kəʊˈhɪə.rənt/", guide: "cầu-hia-rừn-t" },
  "Disparity": { ipa: "/dɪˈspær.ə.ti/", guide: "đít-x-pa-rơ-ti" },
  "Diverge": { ipa: "/daɪˈvɜːdʒ/", guide: "đai-vớt-gi" },
  "Disseminate": { ipa: "/dɪˈsem.ɪ.neɪt/", guide: "đít-xé-mi-nây-t" },
  "Diffuse": { ipa: "/dɪˈfjuːz/", guide: "đíp-phiu-z" },
  "Transform": { ipa: "/trænsˈfɔːm/", guide: "tran-x-phom" },
  "Transcend": { ipa: "/trænˈsend/", guide: "tran-x-xen-đ" },
  "Transient": { ipa: "/ˈtræn.zi.ənt/", guide: "tran-zi-ừn-t" },
  "Transmute": { ipa: "/trænzˈmjuːt/", guide: "tran-x-miu-t" },
  "Subordinate": { ipa: "/səˈbɔː.dɪ.nət/", guide: "xơ-bo-đi-nợt" },
  "Succumb": { ipa: "/səˈkʌm/", guide: "xơ-căm" },
  "Suppress": { ipa: "/səˈpres/", guide: "xơ-pret-x" },
  "Susceptible": { ipa: "/səˈsep.tə.bəl/", guide: "xơ-xép-tơ-bồ" },
  "Proliferate": { ipa: "/prəˈlɪf.ər.eɪt/", guide: "prơ-li-phơ-rây-t" },
  "Propel": { ipa: "/prəˈpel/", guide: "prơ-peo" },
  "Profound": { ipa: "/prəˈfaʊnd/", guide: "prơ-phao-n-đ" },
  "Proactive": { ipa: "/prəʊˈæk.tɪv/", guide: "prô-ác-típ-v" },

  // Trục 2
  "Cognitive": { ipa: "/ˈkɒɡ.nə.tɪv/", guide: "cóc-nơ-típ-v" },
  "Incognito": { ipa: "/ˌɪn.kɒɡˈniː.təʊ/", guide: "in-cóc-ni-tô" },
  "Conscientious": { ipa: "/ˌkɒn.ʃiˈen.ʃəs/", guide: "con-xi-en-xớt-x" },
  "Omniscient": { ipa: "/ɒmˈnɪs.i.ənt/", guide: "om-ni-xi-ừn-t" },
  "Eloquent": { ipa: "/ˈel.ə.kwənt/", guide: "e-lơ-quần-t" },
  "Colloquial": { ipa: "/kəˈləʊ.kwi.əl/", guide: "cơ-lâu-qui-ồ" },
  "Verdict": { ipa: "/ˈvɜː.dɪkt/", guide: "vớt-đích-t" },
  "Jurisdiction": { ipa: "/ˌdʒʊə.rɪsˈdɪk.ʃən/", guide: "giu-ơ-rít-s-đích-xần" },
  "Cacophony": { ipa: "/kəˈkɒf.ə.ni/", guide: "cơ-co-phơ-ni" },

  // Trục 3
  "Demographic": { ipa: "/ˌdem.əˈɡræf.ɪk/", guide: "đe-mơ-gra-phích" },
  "Epidemic": { ipa: "/ˌep.ɪˈdem.ɪk/", guide: "e-pi-đe-mích" },
  "Autocratic": { ipa: "/ˌɔː.təˈkræt.ɪk/", guide: "o-tơ-cra-tích" },
  "Bureaucracy": { ipa: "/bjʊəˈrɒk.rə.si/", guide: "biu-ro-crơ-xi" },
  "Judicious": { ipa: "/dʒuːˈdɪʃ.əs/", guide: "giu-đi-xớt-x" },
  "Civilization": { ipa: "/ˌsɪv.əl.aɪˈzeɪ.ʃən/", guide: "xi-vơ-lai-zây-xần" },
  "Philanthropy": { ipa: "/fɪˈlæn.θrə.pi/", guide: "phi-lan-thrơ-pi" },

  // Trục 4 & 5
  "Chronological": { ipa: "/ˌkrɒn.əˈlɒdʒ.ɪ.kəl/", guide: "cro-nơ-lo-gi-cồ" },
  "Synchronize": { ipa: "/ˈsɪŋ.krə.naɪz/", guide: "xinh-crơ-naiz" },
  "Immutable": { ipa: "/ɪˈmjuː.tə.bəl/", guide: "i-miu-tơ-bồ" },
  "Retrograde": { ipa: "/ˈret.rə.ɡreɪd/", guide: "rét-trơ-gờ-rây-đ" },
  "Subvert": { ipa: "/səbˈvɜːt/", guide: "xắp-vớt-t" },
  "Compulsion": { ipa: "/kəmˈpʌl.ʃən/", guide: "cầm-pan-xần" },
  "Repel": { ipa: "/rɪˈpel/", guide: "ri-peo" },
  "Distend": { ipa: "/dɪˈstend/", guide: "đít-x-ten-đ" },
  "Intermittent": { ipa: "/ˌɪn.təˈmɪt.ənt/", guide: "in-tơ-mít-từn-t" },
  "Protracted": { ipa: "/prəˈtræk.tɪd/", guide: "prơ-trác-tịt-đ" },

  // Trục 10
  "Affliction": { ipa: "/əˈflɪk.ʃən/", guide: "ơ-phlích-xần" },
  "Infliction": { ipa: "/ɪnˈflɪk.ʃən/", guide: "in-phlích-xần" },
  "Conflictual": { ipa: "/kənˈflɪk.tʃu.əl/", guide: "cần-phlíc-chu-ồ" },
  "Fend": { ipa: "/fend/", guide: "phen-đ" },
  "Defensible": { ipa: "/dɪˈfen.sə.bəl/", guide: "đi-phen-xơ-bồ" },
  "Inoffensive": { ipa: "/ˌɪn.əˈfen.sɪv/", guide: "in-ơ-phen-xíp-v" },
  "Belligerent": { ipa: "/bəˈlɪdʒ.ər.ənt/", guide: "bơ-li-giơ-rừn-t" },
  "Bellicose": { ipa: "/ˈbel.ɪ.kəʊs/", guide: "be-li-câu-x" },
  "Antebellum": { ipa: "/ˌæn.tiˈbel.əm/", guide: "an-ti-be-lầm" },
  "Fugitive": { ipa: "/ˈfjuː.dʒə.tɪv/", guide: "phiu-giơ-típ-v" },
  "Centrifugal": { ipa: "/ˌsen.trɪˈfjuː.ɡəl/", guide: "xen-tri-phiu-gồ" },
  "Refuge": { ipa: "/ˈref.juːdʒ/", guide: "ré-phiu-gi" },
  "Pugnacious": { ipa: "/pʌɡˈneɪ.ʃəs/", guide: "pắc-nây-xớt-x" },
  "Repugnant": { ipa: "/rɪˈpʌɡ.nənt/", guide: "ri-pắc-nừn-t" },
  "Impugn": { ipa: "/ɪmˈpjuːn/", guide: "im-piun" },

  // Trục 11
  "Distribute": { ipa: "/dɪˈstrɪb.juːt/", guide: "đít-x-tri-biu-t" },
  "Attribute": { ipa: "/ˈæt.rɪ.bjuːt/", guide: "át-tri-biu-t" },
  "Retribution": { ipa: "/ˌret.rɪˈbjuː.ʃən/", guide: "rét-tri-biu-xần" },
  "Tributary": { ipa: "/ˈtrɪb.jə.tər.i/", guide: "tri-biu-tơ-ri" },
  "Remuneration": { ipa: "/rɪˌmjuː.nərˈeɪ.ʃən/", guide: "ri-miu-nơ-rây-xần" },
  "Municipal": { ipa: "/mjuːˈnɪs.ɪ.pəl/", guide: "miu-ni-xi-pồ" },
  "Munificence": { ipa: "/mjuːˈnɪf.ɪ.səns/", guide: "miu-ni-phi-xừn-x" },
  "Expropriate": { ipa: "/eksˈprəʊ.pri.eɪt/", guide: "ếch-x-prô-pri-ây-t" },
  "Proprietary": { ipa: "/prəˈpraɪə.tər.i/", guide: "prơ-prai-ơ-tơ-ri" },
  "Appropriation": { ipa: "/əˌprəʊ.priˈeɪ.ʃən/", guide: "ơ-prô-pri-ây-xần" },
  "Communal": { ipa: "/kəˈmjuː.nəl/", guide: "cơ-miu-nồ" },
  "Excommunicate": { ipa: "/ˌek.skəˈmjuː.nɪ.keɪt/", guide: "ếch-x-cơ-miu-ni-cây-t" },

  // Trục 12
  "Finite": { ipa: "/ˈfaɪ.naɪt/", guide: "phai-nait" },
  "Definitive": { ipa: "/dɪˈfɪn.ɪ.tɪv/", guide: "đi-phi-ni-típ-v" },
  "Affinity": { ipa: "/əˈfɪn.ə.ti/", guide: "ơ-phi-nơ-ti" },
  "Infinitesimal": { ipa: "/ˌɪn.fɪ.nɪˈtes.ɪ.məl/", guide: "in-phi-ni-té-xi-mồ" },
  "Optimize": { ipa: "/ˈɒp.tɪ.maɪz/", guide: "óp-ti-maiz" },
  "Optician": { ipa: "/ɒpˈtɪʃ.ən/", guide: "óp-tí-xần" },
  "Synopsis": { ipa: "/sɪˈnɒp.sɪs/", guide: "xi-nóp-xít-x" },
  "Retrospect": { ipa: "/ˈret.rə.spekt/", guide: "rét-trơ-xpect" },
  "Introspection": { ipa: "/ˌɪn.trəˈspek.ʃən/", guide: "in-trơ-xpect-xần" },
  "Perspicacious": { ipa: "/ˌpɜː.spɪˈkeɪ.ʃəs/", guide: "pơ-xpi-cây-xớt-x" },
  "Portend": { ipa: "/pɔːˈtend/", guide: "po-ten-đ" },
  "Tendency": { ipa: "/ˈten.dən.si/", guide: "ten-đừn-xi" },
  "Subtend": { ipa: "/səbˈtend/", guide: "xắp-ten-đ" },

  // Trục 13
  "Nexus": { ipa: "/ˈnek.səs/", guide: "néc-xớt-x" },
  "Annexation": { ipa: "/ˌæn.ekˈseɪ.ʃən/", guide: "an-nec-xây-xần" },
  "Connexion": { ipa: "/kəˈnek.ʃən/", guide: "cơ-néc-xần" },
  "Obligation": { ipa: "/ˌɒb.lɪˈɡeɪ.ʃən/", guide: "óp-li-gây-xần" },
  "Ligament": { ipa: "/ˈlɪɡ.ə.mənt/", guide: "lích-gơ-mừn-t" },
  "Liaison": { ipa: "/liˈeɪ.zɒn/", guide: "li-ây-zon" },
  "Seriatim": { ipa: "/ˌsɪə.riˈeɪ.tɪm/", guide: "xi-ri-ây-tìm" },
  "Serialization": { ipa: "/ˌsɪə.ri.əl.aɪˈzeɪ.ʃən/", guide: "xi-ri-ơ-lai-zây-xần" },
  "Adaptability": { ipa: "/əˌdæp.təˈbɪl.ə.ti/", guide: "ơ-đáp-tơ-bi-lơ-ti" },
  "Ineptitude": { ipa: "/ɪnˈep.tɪ.tʃuːd/", guide: "in-ép-ti-chút-đ" },
  "Aptitude": { ipa: "/ˈæp.tɪ.tʃuːd/", guide: "áp-ti-chút-đ" },

  // Trục 14
  "Beneficent": { ipa: "/bəˈnef.ɪ.sənt/", guide: "bơ-né-phi-xừn-t" },
  "Beneficiary": { ipa: "/ˌben.ɪˈfɪʃ.ər.i/", guide: "be-ni-phí-xơ-ri" },
  "Benevolent": { ipa: "/bəˈnev.əl.ənt/", guide: "bơ-né-vơ-lừn-t" },
  "Malevolent": { ipa: "/məˈlev.əl.ənt/", guide: "mơ-lé-vơ-lừn-t" },
  "Malpractice": { ipa: "/ˌmælˈpræk.tɪs/", guide: "man-prác-tít-x" },
  "Malfeasance": { ipa: "/mælˈfiː.zəns/", guide: "man-phi-zừn-x" },
  "Noxious": { ipa: "/ˈnɒk.ʃəs/", guide: "nóc-xớt-x" },
  "Innocuous": { ipa: "/ɪˈnɒk.ju.əs/", guide: "i-nóc-qui-ớt-x" },
  "Detrimental": { ipa: "/ˌdet.rɪˈmen.təl/", guide: "đét-tri-mén-tồ" },
  "Indemnify": { ipa: "/ɪnˈdem.nɪ.faɪ/", guide: "in-đém-ni-phai" },
  "Damning": { ipa: "/ˈdæm.ɪŋ/", guide: "đam-minh" },

  // Trục 15
  "Replenish": { ipa: "/rɪˈplen.ɪʃ/", guide: "ri-plé-nít-sh" },
  "Deplete": { ipa: "/dɪˈpliːt/", guide: "đi-plit" },
  "Plethora": { ipa: "/ˈpleθ.ər.ə/", guide: "plé-thơ-rơ" },
  "Plenary": { ipa: "/ˈpliː.nər.i/", guide: "plí-nơ-ri" },
  "Plenitude": { ipa: "/ˈplen.ɪ.tʃuːd/", guide: "plé-ni-chút-đ" },
  "Vacuous": { ipa: "/ˈvæk.ju.əs/", guide: "vác-qui-ớt-x" },
  "Devoid": { ipa: "/dɪˈvɔɪd/", guide: "đi-voi-đ" },
  "Evacuate": { ipa: "/ɪˈvæk.ju.eɪt/", guide: "i-vác-qui-ây-t" },
  "Paucity": { ipa: "/ˈpɔː.sə.ti/", guide: "po-xơ-ti" },
  "Redundancy": { ipa: "/rɪˈdʌn.dən.si/", guide: "ri-đăn-đừn-xi" },
  "Superfluous": { ipa: "/suːˈpɜː.flu.əs/", guide: "xu-pơ-phlu-ớt-x" },

  // Trục 16
  "Conducive": { ipa: "/kənˈdʒuː.sɪv/", guide: "cần-điu-xíp-v" },
  "Induce": { ipa: "/ɪnˈdjuːs/", guide: "in-đius" },
  "Deduce": { ipa: "/dɪˈdjuːs/", guide: "đi-đius" },
  "Ductile": { ipa: "/ˈdʌk.taɪl/", guide: "đắc-tail" },
  "Rectify": { ipa: "/ˈrek.tɪ.faɪ/", guide: "réc-ti-phai" },
  "Rectitude": { ipa: "/ˈrek.tɪ.tʃuːd/", guide: "réc-ti-chút-đ" },
  "Regulatory": { ipa: "/ˈreɡ.jə.lə.tər.i/", guide: "ré-giu-lơ-tơ-ri" },
  "Deregulation": { ipa: "/ˌdiːˌreɡ.jəˈleɪ.ʃən/", guide: "đi-re-giu-lây-xần" },
  "Regime": { ipa: "/reɪˈʒiːm/", guide: "rây-zhim" },
  "Regimented": { ipa: "/ˈredʒ.ɪ.men.tɪd/", guide: "ré-gi-men-tịt-đ" },

  // Trục 17
  "Amorphous": { ipa: "/əˈmɔː.fəs/", guide: "ơ-mo-phớt-x" },
  "Morphology": { ipa: "/mɔːˈfɒl.ə.dʒi/", guide: "mo-pho-lơ-gi" },
  "Metamorphosis": { ipa: "/ˌmet.əˈmɔː.fə.sɪs/", guide: "me-tơ-mo-phơ-xít-x" },
  "Anthropomorphic": { ipa: "/ˌæn.θrə.pəˈmɔː.fɪk/", guide: "an-thrơ-pơ-mo-phích" },
  "Mutation": { ipa: "/mjuːˈteɪ.ʃən/", guide: "miu-tây-xần" },
  "Permutation": { ipa: "/ˌpɜː.mjuːˈteɪ.ʃən/", guide: "pơ-miu-tây-xần" },
  "Alternative": { ipa: "/ɒlˈtɜː.nə.tɪv/", guide: "on-tơ-nơ-típ-v" },
  "Altruism": { ipa: "/ˈæl.tru.ɪ.zəm/", guide: "an-tru-i-zừm" },
  "Variance": { ipa: "/ˈveə.ri.əns/", guide: "ve-ơ-ri-ừn-x" },
  "Invariably": { ipa: "/ɪnˈveə.ri.ə.bli/", guide: "in-ve-ơ-ri-ơ-bli" },

  // Trục 18
  "Elucidate": { ipa: "/iˈluː.sɪ.deɪt/", guide: "i-lu-xi-đây-t" },
  "Lucid": { ipa: "/ˈluː.sɪd/", guide: "lu-xịt-đ" },
  "Pellucid": { ipa: "/pəˈluː.sɪd/", guide: "pơ-lu-xịt-đ" },
  "Illuminate": { ipa: "/ɪˈluː.mɪ.neɪt/", guide: "i-lu-mi-nây-t" },
  "Luminary": { ipa: "/ˈluː.mɪ.nər.i/", guide: "lu-mi-nơ-ri" },
  "Translucent": { ipa: "/trænzˈluː.sənt/", guide: "tran-z-lu-xừn-t" },
  "Phenomenal": { ipa: "/fəˈnɒm.ɪ.nəl/", guide: "phơ-no-mi-nồ" },
  "Epiphany": { ipa: "/ɪˈpɪf.ən.i/", guide: "i-pi-phơ-ni" },
  "Cryptic": { ipa: "/ˈkrɪp.tɪk/", guide: "críp-tích" },
  "Encryption": { ipa: "/ɪnˈkrɪp.ʃən/", guide: "in-críp-xần" },
  "Manifest": { ipa: "/ˈmæn.ɪ.fest/", guide: "ma-ni-phét-x-t" },
  "Obscure": { ipa: "/əbˈskjʊər/", guide: "ớp-x-kiu-ơ" },
};

/**
 * Returns clean spoken string for SpeechSynthesis, replacing dashes, slashes, etc.
 */
export function cleanForSpeech(input: string): string {
  if (!input) return "";
  return input
    .replace(/\/+/g, ", ")
    .replace(/-+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Resolves phonetic and Vietnamese reading guide for any root stem
 */
export function getRootPronunciation(rootText: string): PronunciationData {
  const clean = rootText.trim().toUpperCase();
  
  if (ROOT_PRONUNCIATION_MAP[clean]) {
    return ROOT_PRONUNCIATION_MAP[clean];
  }

  // Check partial key matches
  for (const [key, val] of Object.entries(ROOT_PRONUNCIATION_MAP)) {
    if (clean.includes(key) || key.includes(clean)) {
      return val;
    }
  }

  // Default heuristic fallback
  return {
    ipa: `/${clean.toLowerCase().replace(/[^a-z]/g, "")}/`,
    vietnameseGuide: clean.toLowerCase().replace(/[^a-z]/g, " "),
    spokenText: cleanForSpeech(clean)
  };
}

/**
 * Resolves phonetic and Vietnamese reading guide for an IELTS word
 */
export function getWordPronunciation(word: string, existingPhonetic?: string, existingGuide?: string): { ipa: string; guide: string } {
  const trimmed = word.trim();
  const found = WORD_PHONETICS_DICT[trimmed] || WORD_PHONETICS_DICT[trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()];

  const ipa = existingPhonetic || found?.ipa || `/${trimmed.toLowerCase()}/`;
  const guide = existingGuide || found?.guide || trimmed.toLowerCase();

  return { ipa, guide };
}

/**
 * SpeechSynthesis wrapper
 */
export class SpeechService {
  private static activeUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  public static speak(
    text: string,
    options?: {
      rate?: number;
      pitch?: number;
      lang?: string;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): void {
    if (!this.isSupported()) {
      console.warn("SpeechSynthesis is not supported in this browser.");
      options?.onError?.(new Error("Trình duyệt hiện tại chưa hỗ trợ Web SpeechSynthesis API."));
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const cleanText = cleanForSpeech(text);
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = options?.rate ?? 0.88; // Slightly measured rate for clear pronunciation learning
      utterance.pitch = options?.pitch ?? 1.0;
      utterance.lang = options?.lang ?? "en-US";

      // Try selecting an English voice
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(
          (v) => (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha")) && v.lang.startsWith("en")
        ) || voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => {
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.activeUtterance = null;
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.activeUtterance = null;
        options?.onError?.(e);
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Lỗi phát âm SpeechSynthesis:", err);
      options?.onError?.(err);
    }
  }

  public static stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
      this.activeUtterance = null;
    }
  }
}
