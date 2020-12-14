const COUNTRIES = [
  {
    Country: 'Gabon',
    Slug: 'gabon',
    ISO2: 'GA',
  },
  {
    Country: 'Réunion',
    Slug: 'réunion',
    ISO2: 'RE',
  },
  {
    Country: 'Samoa',
    Slug: 'samoa',
    ISO2: 'WS',
  },
  {
    Country: 'Solomon Islands',
    Slug: 'solomon-islands',
    ISO2: 'SB',
  },
  {
    Country: 'Turkmenistan',
    Slug: 'turkmenistan',
    ISO2: 'TM',
  },
  {
    Country: 'Australia',
    Slug: 'australia',
    ISO2: 'AU',
  },
  {
    Country: 'Bahrain',
    Slug: 'bahrain',
    ISO2: 'BH',
  },
  {
    Country: 'Congo (Kinshasa)',
    Slug: 'congo-kinshasa',
    ISO2: 'CD',
  },
  {
    Country: 'Netherlands',
    Slug: 'netherlands',
    ISO2: 'NL',
  },
  {
    Country: 'Sierra Leone',
    Slug: 'sierra-leone',
    ISO2: 'SL',
  },
  {
    Country: 'Afghanistan',
    Slug: 'afghanistan',
    ISO2: 'AF',
  },
  {
    Country: 'Belgium',
    Slug: 'belgium',
    ISO2: 'BE',
  },
  {
    Country: 'Nauru',
    Slug: 'nauru',
    ISO2: 'NR',
  },
  {
    Country: 'Saint Kitts and Nevis',
    Slug: 'saint-kitts-and-nevis',
    ISO2: 'KN',
  },
  {
    Country: 'Serbia',
    Slug: 'serbia',
    ISO2: 'RS',
  },
  {
    Country: 'Republic of Kosovo',
    Slug: 'kosovo',
    ISO2: 'XK',
  },
  {
    Country: 'British Virgin Islands',
    Slug: 'british-virgin-islands',
    ISO2: 'VG',
  },
  {
    Country: 'Dominican Republic',
    Slug: 'dominican-republic',
    ISO2: 'DO',
  },
  {
    Country: 'Russian Federation',
    Slug: 'russia',
    ISO2: 'RU',
  },
  {
    Country: 'Belize',
    Slug: 'belize',
    ISO2: 'BZ',
  },
  {
    Country: 'Cyprus',
    Slug: 'cyprus',
    ISO2: 'CY',
  },
  {
    Country: 'Djibouti',
    Slug: 'djibouti',
    ISO2: 'DJ',
  },
  {
    Country: 'Gibraltar',
    Slug: 'gibraltar',
    ISO2: 'GI',
  },
  {
    Country: 'Mauritania',
    Slug: 'mauritania',
    ISO2: 'MR',
  },
  {
    Country: 'Morocco',
    Slug: 'morocco',
    ISO2: 'MA',
  },
  {
    Country: 'Netherlands Antilles',
    Slug: 'netherlands-antilles',
    ISO2: 'AN',
  },
  {
    Country: 'Mali',
    Slug: 'mali',
    ISO2: 'ML',
  },
  {
    Country: 'Seychelles',
    Slug: 'seychelles',
    ISO2: 'SC',
  },
  {
    Country: 'Svalbard and Jan Mayen Islands',
    Slug: 'svalbard-and-jan-mayen-islands',
    ISO2: 'SJ',
  },
  {
    Country: 'Madagascar',
    Slug: 'madagascar',
    ISO2: 'MG',
  },
  {
    Country: 'Micronesia, Federated States of',
    Slug: 'micronesia',
    ISO2: 'FM',
  },
  {
    Country: 'Saint Helena',
    Slug: 'saint-helena',
    ISO2: 'SH',
  },
  {
    Country: 'Tuvalu',
    Slug: 'tuvalu',
    ISO2: 'TV',
  },
  {
    Country: 'Burundi',
    Slug: 'burundi',
    ISO2: 'BI',
  },
  {
    Country: 'Canada',
    Slug: 'canada',
    ISO2: 'CA',
  },
  {
    Country: 'Grenada',
    Slug: 'grenada',
    ISO2: 'GD',
  },
  {
    Country: 'Yemen',
    Slug: 'yemen',
    ISO2: 'YE',
  },
  {
    Country: 'Ireland',
    Slug: 'ireland',
    ISO2: 'IE',
  },
  {
    Country: 'Peru',
    Slug: 'peru',
    ISO2: 'PE',
  },
  {
    Country: 'Saint-Barthélemy',
    Slug: 'saint-barthélemy',
    ISO2: 'BL',
  },
  {
    Country: 'Somalia',
    Slug: 'somalia',
    ISO2: 'SO',
  },
  {
    Country: 'Guatemala',
    Slug: 'guatemala',
    ISO2: 'GT',
  },
  {
    Country: 'Myanmar',
    Slug: 'myanmar',
    ISO2: 'MM',
  },
  {
    Country: 'Pitcairn',
    Slug: 'pitcairn',
    ISO2: 'PN',
  },
  {
    Country: 'Thailand',
    Slug: 'thailand',
    ISO2: 'TH',
  },
  {
    Country: 'Angola',
    Slug: 'angola',
    ISO2: 'AO',
  },
  {
    Country: 'Bermuda',
    Slug: 'bermuda',
    ISO2: 'BM',
  },
  {
    Country: 'Cambodia',
    Slug: 'cambodia',
    ISO2: 'KH',
  },
  {
    Country: 'Ghana',
    Slug: 'ghana',
    ISO2: 'GH',
  },
  {
    Country: 'Hong Kong, SAR China',
    Slug: 'hong-kong-sar-china',
    ISO2: 'HK',
  },
  {
    Country: 'Liberia',
    Slug: 'liberia',
    ISO2: 'LR',
  },
  {
    Country: 'Slovakia',
    Slug: 'slovakia',
    ISO2: 'SK',
  },
  {
    Country: 'Suriname',
    Slug: 'suriname',
    ISO2: 'SR',
  },
  {
    Country: 'Austria',
    Slug: 'austria',
    ISO2: 'AT',
  },
  {
    Country: 'Jordan',
    Slug: 'jordan',
    ISO2: 'JO',
  },
  {
    Country: 'Lesotho',
    Slug: 'lesotho',
    ISO2: 'LS',
  },
  {
    Country: 'Martinique',
    Slug: 'martinique',
    ISO2: 'MQ',
  },
  {
    Country: 'Nigeria',
    Slug: 'nigeria',
    ISO2: 'NG',
  },
  {
    Country: 'Saint Lucia',
    Slug: 'saint-lucia',
    ISO2: 'LC',
  },
  {
    Country: 'Zambia',
    Slug: 'zambia',
    ISO2: 'ZM',
  },
  {
    Country: 'Antarctica',
    Slug: 'antarctica',
    ISO2: 'AQ',
  },
  {
    Country: 'Chad',
    Slug: 'chad',
    ISO2: 'TD',
  },
  {
    Country: 'Indonesia',
    Slug: 'indonesia',
    ISO2: 'ID',
  },
  {
    Country: 'Maldives',
    Slug: 'maldives',
    ISO2: 'MV',
  },
  {
    Country: 'Nepal',
    Slug: 'nepal',
    ISO2: 'NP',
  },
  {
    Country: 'Saint Pierre and Miquelon',
    Slug: 'saint-pierre-and-miquelon',
    ISO2: 'PM',
  },
  {
    Country: 'Sudan',
    Slug: 'sudan',
    ISO2: 'SD',
  },
  {
    Country: 'Costa Rica',
    Slug: 'costa-rica',
    ISO2: 'CR',
  },
  {
    Country: 'Palestinian Territory',
    Slug: 'palestine',
    ISO2: 'PS',
  },
  {
    Country: 'Argentina',
    Slug: 'argentina',
    ISO2: 'AR',
  },
  {
    Country: 'Malaysia',
    Slug: 'malaysia',
    ISO2: 'MY',
  },
  {
    Country: 'Senegal',
    Slug: 'senegal',
    ISO2: 'SN',
  },
  {
    Country: 'Andorra',
    Slug: 'andorra',
    ISO2: 'AD',
  },
  {
    Country: 'Brazil',
    Slug: 'brazil',
    ISO2: 'BR',
  },
  {
    Country: 'Namibia',
    Slug: 'namibia',
    ISO2: 'NA',
  },
  {
    Country: 'Switzerland',
    Slug: 'switzerland',
    ISO2: 'CH',
  },
  {
    Country: 'Togo',
    Slug: 'togo',
    ISO2: 'TG',
  },
  {
    Country: 'Aruba',
    Slug: 'aruba',
    ISO2: 'AW',
  },
  {
    Country: 'Brunei Darussalam',
    Slug: 'brunei',
    ISO2: 'BN',
  },
  {
    Country: 'Norway',
    Slug: 'norway',
    ISO2: 'NO',
  },
  {
    Country: 'South Africa',
    Slug: 'south-africa',
    ISO2: 'ZA',
  },
  {
    Country: 'Guadeloupe',
    Slug: 'guadeloupe',
    ISO2: 'GP',
  },
  {
    Country: 'Guyana',
    Slug: 'guyana',
    ISO2: 'GY',
  },
  {
    Country: 'Poland',
    Slug: 'poland',
    ISO2: 'PL',
  },
  {
    Country: 'San Marino',
    Slug: 'san-marino',
    ISO2: 'SM',
  },
  {
    Country: 'Montserrat',
    Slug: 'montserrat',
    ISO2: 'MS',
  },
  {
    Country: 'Puerto Rico',
    Slug: 'puerto-rico',
    ISO2: 'PR',
  },
  {
    Country: 'Saint-Martin (French part)',
    Slug: 'saint-martin-french-part',
    ISO2: 'MF',
  },
  {
    Country: 'United States of America',
    Slug: 'united-states',
    ISO2: 'US',
  },
  {
    Country: 'India',
    Slug: 'india',
    ISO2: 'IN',
  },
  {
    Country: 'Northern Mariana Islands',
    Slug: 'northern-mariana-islands',
    ISO2: 'MP',
  },
  {
    Country: 'Slovenia',
    Slug: 'slovenia',
    ISO2: 'SI',
  },
  {
    Country: 'French Southern Territories',
    Slug: 'french-southern-territories',
    ISO2: 'TF',
  },
  {
    Country: 'Turks and Caicos Islands',
    Slug: 'turks-and-caicos-islands',
    ISO2: 'TC',
  },
  {
    Country: 'Algeria',
    Slug: 'algeria',
    ISO2: 'DZ',
  },
  {
    Country: 'Cocos (Keeling) Islands',
    Slug: 'cocos-keeling-islands',
    ISO2: 'CC',
  },
  {
    Country: 'Ecuador',
    Slug: 'ecuador',
    ISO2: 'EC',
  },
  {
    Country: 'Ethiopia',
    Slug: 'ethiopia',
    ISO2: 'ET',
  },
  {
    Country: 'Jamaica',
    Slug: 'jamaica',
    ISO2: 'JM',
  },
  {
    Country: 'Colombia',
    Slug: 'colombia',
    ISO2: 'CO',
  },
  {
    Country: 'Latvia',
    Slug: 'latvia',
    ISO2: 'LV',
  },
  {
    Country: 'Macedonia, Republic of',
    Slug: 'macedonia',
    ISO2: 'MK',
  },
  {
    Country: 'Saudi Arabia',
    Slug: 'saudi-arabia',
    ISO2: 'SA',
  },
  {
    Country: 'Timor-Leste',
    Slug: 'timor-leste',
    ISO2: 'TL',
  },
  {
    Country: 'Armenia',
    Slug: 'armenia',
    ISO2: 'AM',
  },
  {
    Country: 'Central African Republic',
    Slug: 'central-african-republic',
    ISO2: 'CF',
  },
  {
    Country: 'Mauritius',
    Slug: 'mauritius',
    ISO2: 'MU',
  },
  {
    Country: 'Palau',
    Slug: 'palau',
    ISO2: 'PW',
  },
  {
    Country: 'Portugal',
    Slug: 'portugal',
    ISO2: 'PT',
  },
  {
    Country: 'Zimbabwe',
    Slug: 'zimbabwe',
    ISO2: 'ZW',
  },
  {
    Country: 'Barbados',
    Slug: 'barbados',
    ISO2: 'BB',
  },
  {
    Country: 'Benin',
    Slug: 'benin',
    ISO2: 'BJ',
  },
  {
    Country: 'Faroe Islands',
    Slug: 'faroe-islands',
    ISO2: 'FO',
  },
  {
    Country: 'Uruguay',
    Slug: 'uruguay',
    ISO2: 'UY',
  },
  {
    Country: 'Vanuatu',
    Slug: 'vanuatu',
    ISO2: 'VU',
  },
  {
    Country: 'Kazakhstan',
    Slug: 'kazakhstan',
    ISO2: 'KZ',
  },
  {
    Country: 'Lithuania',
    Slug: 'lithuania',
    ISO2: 'LT',
  },
  {
    Country: 'Trinidad and Tobago',
    Slug: 'trinidad-and-tobago',
    ISO2: 'TT',
  },
  {
    Country: 'Bangladesh',
    Slug: 'bangladesh',
    ISO2: 'BD',
  },
  {
    Country: "Côte d'Ivoire",
    Slug: 'cote-divoire',
    ISO2: 'CI',
  },
  {
    Country: 'Taiwan, Republic of China',
    Slug: 'taiwan',
    ISO2: 'TW',
  },
  {
    Country: 'Uganda',
    Slug: 'uganda',
    ISO2: 'UG',
  },
  {
    Country: 'Bulgaria',
    Slug: 'bulgaria',
    ISO2: 'BG',
  },
  {
    Country: 'Comoros',
    Slug: 'comoros',
    ISO2: 'KM',
  },
  {
    Country: 'Sao Tome and Principe',
    Slug: 'sao-tome-and-principe',
    ISO2: 'ST',
  },
  {
    Country: 'Albania',
    Slug: 'albania',
    ISO2: 'AL',
  },
  {
    Country: 'British Indian Ocean Territory',
    Slug: 'british-indian-ocean-territory',
    ISO2: 'IO',
  },
  {
    Country: 'Dominica',
    Slug: 'dominica',
    ISO2: 'DM',
  },
  {
    Country: 'Niger',
    Slug: 'niger',
    ISO2: 'NE',
  },
  {
    Country: 'Norfolk Island',
    Slug: 'norfolk-island',
    ISO2: 'NF',
  },
  {
    Country: 'Turkey',
    Slug: 'turkey',
    ISO2: 'TR',
  },
  {
    Country: 'United Arab Emirates',
    Slug: 'united-arab-emirates',
    ISO2: 'AE',
  },
  {
    Country: 'Virgin Islands, US',
    Slug: 'virgin-islands',
    ISO2: 'VI',
  },
  {
    Country: 'Hungary',
    Slug: 'hungary',
    ISO2: 'HU',
  },
  {
    Country: 'Lao PDR',
    Slug: 'lao-pdr',
    ISO2: 'LA',
  },
  {
    Country: 'Mozambique',
    Slug: 'mozambique',
    ISO2: 'MZ',
  },
  {
    Country: 'Wallis and Futuna Islands',
    Slug: 'wallis-and-futuna-islands',
    ISO2: 'WF',
  },
  {
    Country: 'Bolivia',
    Slug: 'bolivia',
    ISO2: 'BO',
  },
  {
    Country: 'Greece',
    Slug: 'greece',
    ISO2: 'GR',
  },
  {
    Country: 'Kyrgyzstan',
    Slug: 'kyrgyzstan',
    ISO2: 'KG',
  },
  {
    Country: 'Venezuela (Bolivarian Republic)',
    Slug: 'venezuela',
    ISO2: 'VE',
  },
  {
    Country: 'Cape Verde',
    Slug: 'cape-verde',
    ISO2: 'CV',
  },
  {
    Country: 'Croatia',
    Slug: 'croatia',
    ISO2: 'HR',
  },
  {
    Country: 'Denmark',
    Slug: 'denmark',
    ISO2: 'DK',
  },
  {
    Country: 'French Guiana',
    Slug: 'french-guiana',
    ISO2: 'GF',
  },
  {
    Country: 'Jersey',
    Slug: 'jersey',
    ISO2: 'JE',
  },
  {
    Country: 'Niue',
    Slug: 'niue',
    ISO2: 'NU',
  },
  {
    Country: 'Monaco',
    Slug: 'monaco',
    ISO2: 'MC',
  },
  {
    Country: 'Singapore',
    Slug: 'singapore',
    ISO2: 'SG',
  },
  {
    Country: 'Viet Nam',
    Slug: 'vietnam',
    ISO2: 'VN',
  },
  {
    Country: 'Macao, SAR China',
    Slug: 'macao-sar-china',
    ISO2: 'MO',
  },
  {
    Country: 'Philippines',
    Slug: 'philippines',
    ISO2: 'PH',
  },
  {
    Country: 'Iran, Islamic Republic of',
    Slug: 'iran',
    ISO2: 'IR',
  },
  {
    Country: 'Malawi',
    Slug: 'malawi',
    ISO2: 'MW',
  },
  {
    Country: 'New Zealand',
    Slug: 'new-zealand',
    ISO2: 'NZ',
  },
  {
    Country: 'South Georgia and the South Sandwich Islands',
    Slug: 'south-georgia-and-the-south-sandwich-islands',
    ISO2: 'GS',
  },
  {
    Country: 'Burkina Faso',
    Slug: 'burkina-faso',
    ISO2: 'BF',
  },
  {
    Country: 'El Salvador',
    Slug: 'el-salvador',
    ISO2: 'SV',
  },
  {
    Country: 'France',
    Slug: 'france',
    ISO2: 'FR',
  },
  {
    Country: 'Korea (North)',
    Slug: 'korea-north',
    ISO2: 'KP',
  },
  {
    Country: 'Spain',
    Slug: 'spain',
    ISO2: 'ES',
  },
  {
    Country: 'Greenland',
    Slug: 'greenland',
    ISO2: 'GL',
  },
  {
    Country: 'Honduras',
    Slug: 'honduras',
    ISO2: 'HN',
  },
  {
    Country: 'Qatar',
    Slug: 'qatar',
    ISO2: 'QA',
  },
  {
    Country: 'Guinea-Bissau',
    Slug: 'guinea-bissau',
    ISO2: 'GW',
  },
  {
    Country: 'Oman',
    Slug: 'oman',
    ISO2: 'OM',
  },
  {
    Country: 'Egypt',
    Slug: 'egypt',
    ISO2: 'EG',
  },
  {
    Country: 'Isle of Man',
    Slug: 'isle-of-man',
    ISO2: 'IM',
  },
  {
    Country: 'Luxembourg',
    Slug: 'luxembourg',
    ISO2: 'LU',
  },
  {
    Country: 'United Kingdom',
    Slug: 'united-kingdom',
    ISO2: 'GB',
  },
  {
    Country: 'Azerbaijan',
    Slug: 'azerbaijan',
    ISO2: 'AZ',
  },
  {
    Country: 'Cuba',
    Slug: 'cuba',
    ISO2: 'CU',
  },
  {
    Country: 'Papua New Guinea',
    Slug: 'papua-new-guinea',
    ISO2: 'PG',
  },
  {
    Country: 'Bhutan',
    Slug: 'bhutan',
    ISO2: 'BT',
  },
  {
    Country: 'Ukraine',
    Slug: 'ukraine',
    ISO2: 'UA',
  },
  {
    Country: 'Cayman Islands',
    Slug: 'cayman-islands',
    ISO2: 'KY',
  },
  {
    Country: 'Finland',
    Slug: 'finland',
    ISO2: 'FI',
  },
  {
    Country: 'Guernsey',
    Slug: 'guernsey',
    ISO2: 'GG',
  },
  {
    Country: 'Iceland',
    Slug: 'iceland',
    ISO2: 'IS',
  },
  {
    Country: 'Korea (South)',
    Slug: 'korea-south',
    ISO2: 'KR',
  },
  {
    Country: 'Nicaragua',
    Slug: 'nicaragua',
    ISO2: 'NI',
  },
  {
    Country: 'Japan',
    Slug: 'japan',
    ISO2: 'JP',
  },
  {
    Country: 'Lebanon',
    Slug: 'lebanon',
    ISO2: 'LB',
  },
  {
    Country: 'Panama',
    Slug: 'panama',
    ISO2: 'PA',
  },
  {
    Country: 'US Minor Outlying Islands',
    Slug: 'us-minor-outlying-islands',
    ISO2: 'UM',
  },
  {
    Country: 'Bahamas',
    Slug: 'bahamas',
    ISO2: 'BS',
  },
  {
    Country: 'Montenegro',
    Slug: 'montenegro',
    ISO2: 'ME',
  },
  {
    Country: 'New Caledonia',
    Slug: 'new-caledonia',
    ISO2: 'NC',
  },
  {
    Country: 'Antigua and Barbuda',
    Slug: 'antigua-and-barbuda',
    ISO2: 'AG',
  },
  {
    Country: 'Guam',
    Slug: 'guam',
    ISO2: 'GU',
  },
  {
    Country: 'Sweden',
    Slug: 'sweden',
    ISO2: 'SE',
  },
  {
    Country: 'Tanzania, United Republic of',
    Slug: 'tanzania',
    ISO2: 'TZ',
  },
  {
    Country: 'Tonga',
    Slug: 'tonga',
    ISO2: 'TO',
  },
  {
    Country: 'Anguilla',
    Slug: 'anguilla',
    ISO2: 'AI',
  },
  {
    Country: 'Bouvet Island',
    Slug: 'bouvet-island',
    ISO2: 'BV',
  },
  {
    Country: 'Eritrea',
    Slug: 'eritrea',
    ISO2: 'ER',
  },
  {
    Country: 'Israel',
    Slug: 'israel',
    ISO2: 'IL',
  },
  {
    Country: 'Liechtenstein',
    Slug: 'liechtenstein',
    ISO2: 'LI',
  },
  {
    Country: 'Congo (Brazzaville)',
    Slug: 'congo-brazzaville',
    ISO2: 'CG',
  },
  {
    Country: 'Fiji',
    Slug: 'fiji',
    ISO2: 'FJ',
  },
  {
    Country: 'Iraq',
    Slug: 'iraq',
    ISO2: 'IQ',
  },
  {
    Country: 'Italy',
    Slug: 'italy',
    ISO2: 'IT',
  },
  {
    Country: 'ALA Aland Islands',
    Slug: 'ala-aland-islands',
    ISO2: 'AX',
  },
  {
    Country: 'Bosnia and Herzegovina',
    Slug: 'bosnia-and-herzegovina',
    ISO2: 'BA',
  },
  {
    Country: 'Czech Republic',
    Slug: 'czech-republic',
    ISO2: 'CZ',
  },
  {
    Country: 'Equatorial Guinea',
    Slug: 'equatorial-guinea',
    ISO2: 'GQ',
  },
  {
    Country: 'Guinea',
    Slug: 'guinea',
    ISO2: 'GN',
  },
  {
    Country: 'Heard and Mcdonald Islands',
    Slug: 'heard-and-mcdonald-islands',
    ISO2: 'HM',
  },
  {
    Country: 'Chile',
    Slug: 'chile',
    ISO2: 'CL',
  },
  {
    Country: 'Marshall Islands',
    Slug: 'marshall-islands',
    ISO2: 'MH',
  },
  {
    Country: 'Mayotte',
    Slug: 'mayotte',
    ISO2: 'YT',
  },
  {
    Country: 'Tokelau',
    Slug: 'tokelau',
    ISO2: 'TK',
  },
  {
    Country: 'Western Sahara',
    Slug: 'western-sahara',
    ISO2: 'EH',
  },
  {
    Country: 'Cameroon',
    Slug: 'cameroon',
    ISO2: 'CM',
  },
  {
    Country: 'Cook Islands',
    Slug: 'cook-islands',
    ISO2: 'CK',
  },
  {
    Country: 'Syrian Arab Republic (Syria)',
    Slug: 'syria',
    ISO2: 'SY',
  },
  {
    Country: 'China',
    Slug: 'china',
    ISO2: 'CN',
  },
  {
    Country: 'Estonia',
    Slug: 'estonia',
    ISO2: 'EE',
  },
  {
    Country: 'Kiribati',
    Slug: 'kiribati',
    ISO2: 'KI',
  },
  {
    Country: 'Rwanda',
    Slug: 'rwanda',
    ISO2: 'RW',
  },
  {
    Country: 'Uzbekistan',
    Slug: 'uzbekistan',
    ISO2: 'UZ',
  },
  {
    Country: 'Falkland Islands (Malvinas)',
    Slug: 'falkland-islands-malvinas',
    ISO2: 'FK',
  },
  {
    Country: 'Gambia',
    Slug: 'gambia',
    ISO2: 'GM',
  },
  {
    Country: 'Holy See (Vatican City State)',
    Slug: 'holy-see-vatican-city-state',
    ISO2: 'VA',
  },
  {
    Country: 'Kenya',
    Slug: 'kenya',
    ISO2: 'KE',
  },
  {
    Country: 'Moldova',
    Slug: 'moldova',
    ISO2: 'MD',
  },
  {
    Country: 'Christmas Island',
    Slug: 'christmas-island',
    ISO2: 'CX',
  },
  {
    Country: 'Haiti',
    Slug: 'haiti',
    ISO2: 'HT',
  },
  {
    Country: 'Libya',
    Slug: 'libya',
    ISO2: 'LY',
  },
  {
    Country: 'Tunisia',
    Slug: 'tunisia',
    ISO2: 'TN',
  },
  {
    Country: 'French Polynesia',
    Slug: 'french-polynesia',
    ISO2: 'PF',
  },
  {
    Country: 'Germany',
    Slug: 'germany',
    ISO2: 'DE',
  },
  {
    Country: 'Mongolia',
    Slug: 'mongolia',
    ISO2: 'MN',
  },
  {
    Country: 'Pakistan',
    Slug: 'pakistan',
    ISO2: 'PK',
  },
  {
    Country: 'Romania',
    Slug: 'romania',
    ISO2: 'RO',
  },
  {
    Country: 'Swaziland',
    Slug: 'swaziland',
    ISO2: 'SZ',
  },
  {
    Country: 'American Samoa',
    Slug: 'american-samoa',
    ISO2: 'AS',
  },
  {
    Country: 'Paraguay',
    Slug: 'paraguay',
    ISO2: 'PY',
  },
  {
    Country: 'Saint Vincent and Grenadines',
    Slug: 'saint-vincent-and-the-grenadines',
    ISO2: 'VC',
  },
  {
    Country: 'Tajikistan',
    Slug: 'tajikistan',
    ISO2: 'TJ',
  },
  {
    Country: 'Belarus',
    Slug: 'belarus',
    ISO2: 'BY',
  },
  {
    Country: 'Botswana',
    Slug: 'botswana',
    ISO2: 'BW',
  },
  {
    Country: 'Mexico',
    Slug: 'mexico',
    ISO2: 'MX',
  },
  {
    Country: 'Georgia',
    Slug: 'georgia',
    ISO2: 'GE',
  },
  {
    Country: 'South Sudan',
    Slug: 'south-sudan',
    ISO2: 'SS',
  },
  {
    Country: 'Kuwait',
    Slug: 'kuwait',
    ISO2: 'KW',
  },
  {
    Country: 'Malta',
    Slug: 'malta',
    ISO2: 'MT',
  },
  {
    Country: 'Sri Lanka',
    Slug: 'sri-lanka',
    ISO2: 'LK',
  },
];

export default COUNTRIES;
