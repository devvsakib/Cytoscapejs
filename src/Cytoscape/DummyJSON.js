[
    {
        data: {
            id: "vpc-0166a906d0caee5ef_combo",
            label: "vpc",
            resource_type: "aws_vpc",
            properties: {
                id: "vpc-0166a906d0caee5ef",
                account_id: "036376663423",
                akas: [
                    "arn:aws:ec2:ap-south-1:036376663423:vpc/vpc-0166a906d0caee5ef"
                ],
                arn: "arn:aws:ec2:ap-south-1:036376663423:vpc/vpc-0166a906d0caee5ef",
                cidr_block: "172.31.0.0/16",
                cidr_block_association_set: [
                    {
                        AssociationId: "vpc-cidr-assoc-08b1d3adfd12ea33a",
                        CidrBlock: "172.31.0.0/16",
                        CidrBlockState: {
                            State: "associated",
                            StatusMessage: null
                        }
                    }
                ],
                dhcp_options_id: "dopt-0792fa3af5c7ffab8",
                instance_tenancy: "default",
                ipv6_cidr_block_association_set: null,
                is_default: true,
                name: "vpc-0166a906d0caee5ef",
                owner_id: "036376663423",
                partition: "aws",
                region: "ap-south-1",
                state: "available",
                tags_src: null,
                title: "vpc-0166a906d0caee5ef",
                urn: "arn:aws:ec2:ap-south-1:036376663423:vpc/vpc-0166a906d0caee5ef",
                vpc_id: "vpc-0166a906d0caee5ef",
                integration_id: "036376663423",
                integration_type: "aws",
                resource_type: "aws_vpc",
                inventory_exc_id: "648820b2f05601c990a7c0e3",
                inventory_schedule_id: "6488176bf09809e62673246f",
                user_id: "amit@shunyeka.com",
                root_user_id: "amit@shunyeka.com",
                updated_at: "2023-06-13T08:54:56.272000",
                created_at: "2023-06-13T08:54:56.272000",
                label: "vpc",
                ogid: "arn:aws:ec2:ap-south-1:036376663423:vpc/vpc-0166a906d0caee5ef"
            }
        }
    },
    {
        data: {
            id: "subnet-0531b0ff5654cc6e0_combo",
            label: "vpc subnet",
            resource_type: "aws_vpc_subnet",
            properties: {
                id: "subnet-0531b0ff5654cc6e0",
                account_id: "036376663423",
                akas: [
                    "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-0531b0ff5654cc6e0"
                ],
                assign_ipv6_address_on_creation: false,
                availability_zone: "ap-south-1b",
                availability_zone_id: "aps1-az3",
                available_ip_address_count: 4090,
                cidr_block: "172.31.0.0/20",
                customer_owned_ipv4_pool: null,
                default_for_az: true,
                ipv6_cidr_block_association_set: [],
                map_customer_owned_ip_on_launch: false,
                map_public_ip_on_launch: true,
                name: "subnet-0531b0ff5654cc6e0",
                outpost_arn: null,
                owner_id: "036376663423",
                partition: "aws",
                region: "ap-south-1",
                state: "available",
                subnet_arn: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-0531b0ff5654cc6e0",
                subnet_id: "subnet-0531b0ff5654cc6e0",
                tags_src: null,
                title: "subnet-0531b0ff5654cc6e0",
                urn: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-0531b0ff5654cc6e0",
                vpc_id: "vpc-0166a906d0caee5ef",
                integration_id: "036376663423",
                integration_type: "aws",
                resource_type: "aws_vpc_subnet",
                inventory_exc_id: "648820b2f05601c990a7c0e3",
                inventory_schedule_id: "6488176bf09809e62673246f",
                user_id: "amit@shunyeka.com",
                root_user_id: "amit@shunyeka.com",
                updated_at: "2023-06-13T08:58:19.134000",
                created_at: "2023-06-13T08:58:19.134000",
                is_public: true,
                label: "vpc subnet",
                ogid: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-0531b0ff5654cc6e0"
            },
            parent: "vpc-0166a906d0caee5ef_combo"
        }
    },
    {
        data: {
            id: "subnet-09ab848f4b9facfcd_combo",
            label: "vpc subnet",
            resource_type: "aws_vpc_subnet",
            properties: {
                id: "subnet-09ab848f4b9facfcd",
                account_id: "036376663423",
                akas: [
                    "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-09ab848f4b9facfcd"
                ],
                assign_ipv6_address_on_creation: false,
                availability_zone: "ap-south-1c",
                availability_zone_id: "aps1-az2",
                available_ip_address_count: 4091,
                cidr_block: "172.31.16.0/20",
                customer_owned_ipv4_pool: null,
                default_for_az: true,
                ipv6_cidr_block_association_set: [],
                map_customer_owned_ip_on_launch: false,
                map_public_ip_on_launch: true,
                name: "subnet-09ab848f4b9facfcd",
                outpost_arn: null,
                owner_id: "036376663423",
                partition: "aws",
                region: "ap-south-1",
                state: "available",
                subnet_arn: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-09ab848f4b9facfcd",
                subnet_id: "subnet-09ab848f4b9facfcd",
                tags_src: null,
                title: "subnet-09ab848f4b9facfcd",
                urn: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-09ab848f4b9facfcd",
                vpc_id: "vpc-0166a906d0caee5ef",
                integration_id: "036376663423",
                integration_type: "aws",
                resource_type: "aws_vpc_subnet",
                inventory_exc_id: "648820b2f05601c990a7c0e3",
                inventory_schedule_id: "6488176bf09809e62673246f",
                user_id: "amit@shunyeka.com",
                root_user_id: "amit@shunyeka.com",
                updated_at: "2023-06-13T08:58:19.134000",
                created_at: "2023-06-13T08:58:19.134000",
                is_public: true,
                label: "vpc subnet",
                ogid: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-09ab848f4b9facfcd"
            },
            parent: "vpc-0166a906d0caee5ef_combo"
        }
    },
    {
        data: {
            id: "subnet-00d92e65669a367f4_combo",
            label: "vpc subnet",
            resource_type: "aws_vpc_subnet",
            properties: {
                id: "subnet-00d92e65669a367f4",
                account_id: "036376663423",
                akas: [
                    "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-00d92e65669a367f4"
                ],
                assign_ipv6_address_on_creation: false,
                availability_zone: "ap-south-1a",
                availability_zone_id: "aps1-az1",
                available_ip_address_count: 4091,
                cidr_block: "172.31.32.0/20",
                customer_owned_ipv4_pool: null,
                default_for_az: true,
                ipv6_cidr_block_association_set: [],
                map_customer_owned_ip_on_launch: false,
                map_public_ip_on_launch: true,
                name: "subnet-00d92e65669a367f4",
                outpost_arn: null,
                owner_id: "036376663423",
                partition: "aws",
                region: "ap-south-1",
                state: "available",
                subnet_arn: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-00d92e65669a367f4",
                subnet_id: "subnet-00d92e65669a367f4",
                tags_src: null,
                title: "subnet-00d92e65669a367f4",
                urn: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-00d92e65669a367f4",
                vpc_id: "vpc-0166a906d0caee5ef",
                integration_id: "036376663423",
                integration_type: "aws",
                resource_type: "aws_vpc_subnet",
                inventory_exc_id: "648820b2f05601c990a7c0e3",
                inventory_schedule_id: "6488176bf09809e62673246f",
                user_id: "amit@shunyeka.com",
                root_user_id: "amit@shunyeka.com",
                updated_at: "2023-06-13T08:58:19.134000",
                created_at: "2023-06-13T08:58:19.134000",
                is_public: true,
                label: "vpc subnet",
                ogid: "arn:aws:ec2:ap-south-1:036376663423:subnet/subnet-00d92e65669a367f4"
            },
            parent: "vpc-0166a906d0caee5ef_combo"
        }
    },
    {
        data: {
            id: "i-03d0d53d18199274a",
            account_id: "036376663423",
            akas: [
                "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a"
            ],
            ami_launch_index: 0,
            architecture: "x86_64",
            arn: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            block_device_mappings: [
                {
                    DeviceName: "/dev/xvda",
                    Ebs: {
                        AttachTime: "2023-06-13T06:43:06Z",
                        DeleteOnTermination: true,
                        Status: "attached",
                        VolumeId: "vol-02acbc5657acc3cae"
                    }
                }
            ],
            boot_mode: "uefi-preferred",
            capacity_reservation_id: null,
            capacity_reservation_specification: "{CapacityReservationPreference:open CapacityReservationTarget:<nil> noSmithyDocumentSerde:{}}",
            client_token: "6218aa7f-eecd-4c58-8dff-6b8f1af0a694",
            cpu_options_core_count: 1,
            cpu_options_threads_per_core: 1,
            disable_api_termination: false,
            ebs_optimized: false,
            elastic_gpu_associations: null,
            elastic_inference_accelerator_associations: null,
            ena_support: true,
            enclave_options: {
                Enabled: false
            },
            hibernation_options: {
                Configured: false
            },
            hypervisor: "xen",
            iam_instance_profile_arn: null,
            iam_instance_profile_id: null,
            image_id: "ami-049a62eb90480f276",
            instance_id: "i-03d0d53d18199274a",
            instance_initiated_shutdown_behavior: "stop",
            instance_lifecycle: "",
            instance_state: "stopped",
            instance_status: {
                AvailabilityZone: "ap-south-1b",
                Events: null,
                InstanceId: "i-03d0d53d18199274a",
                InstanceState: {
                    Code: 80,
                    Name: "stopped"
                },
                InstanceStatus: {
                    Details: null,
                    Status: "not-applicable"
                },
                OutpostArn: null,
                SystemStatus: {
                    Details: null,
                    Status: "not-applicable"
                }
            },
            instance_type: "t2.micro",
            kernel_id: null,
            key_name: null,
            launch_time: "2023-06-13T06:43:05Z",
            metadata_options: {
                HttpEndpoint: "enabled",
                HttpProtocolIpv6: "disabled",
                HttpPutResponseHopLimit: 2,
                HttpTokens: "required",
                InstanceMetadataTags: "disabled",
                State: "applied"
            },
            monitoring_state: "disabled",
            name: "qatestawscomplianceinstance1",
            network_interfaces: [
                {
                    Association: null,
                    Attachment: {
                        AttachTime: "2023-06-13T06:43:05Z",
                        AttachmentId: "eni-attach-09724a5cfc4ba4edd",
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        NetworkCardIndex: 0,
                        Status: "attached"
                    },
                    Description: "",
                    Groups: [
                        {
                            GroupId: "sg-0a7966ef6c9ac1580",
                            GroupName: "launch-wizard-7"
                        }
                    ],
                    InterfaceType: "interface",
                    Ipv4Prefixes: null,
                    Ipv6Addresses: [],
                    Ipv6Prefixes: null,
                    MacAddress: "0a:bd:70:8b:46:3c",
                    NetworkInterfaceId: "eni-03e9b1775ca0fb63a",
                    OwnerId: "036376663423",
                    PrivateDnsName: "ip-172-31-12-125.ap-south-1.compute.internal",
                    PrivateIpAddress: "172.31.12.125",
                    PrivateIpAddresses: [
                        {
                            Association: null,
                            Primary: true,
                            PrivateDnsName: "ip-172-31-12-125.ap-south-1.compute.internal",
                            PrivateIpAddress: "172.31.12.125"
                        }
                    ],
                    SourceDestCheck: true,
                    Status: "in-use",
                    SubnetId: "subnet-0531b0ff5654cc6e0",
                    VpcId: "vpc-0166a906d0caee5ef"
                }
            ],
            outpost_arn: null,
            partition: "aws",
            placement_availability_zone: "ap-south-1b",
            placement_group_name: "",
            placement_tenancy: "default",
            platform: "",
            platform_details: "Linux/UNIX",
            private_dns_name: "ip-172-31-12-125.ap-south-1.compute.internal",
            private_dns_name_options: {
                EnableResourceNameDnsAAAARecord: false,
                EnableResourceNameDnsARecord: true,
                HostnameType: "ip-name"
            },
            private_ip_address: "172.31.12.125",
            product_codes: [],
            public_dns_name: "",
            public_ip_address: null,
            ram_disk_id: null,
            region: "ap-south-1",
            root_device_name: "/dev/xvda",
            root_device_type: "ebs",
            security_groups: [
                {
                    GroupId: "sg-0a7966ef6c9ac1580",
                    GroupName: "launch-wizard-7"
                }
            ],
            source_dest_check: true,
            sriov_net_support: "simple",
            state_code: 80,
            state_transition_reason: "User initiated (2023-06-13 07:04:00 GMT)",
            state_transition_time: "2023-06-13T07:04:00Z",
            subnet_id: "subnet-0531b0ff5654cc6e0",
            tags_src: [
                {
                    Key: "Name",
                    Value: "qatestawscomplianceinstance1"
                }
            ],
            title: "qatestawscomplianceinstance1",
            tpm_support: null,
            urn: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            usage_operation: "RunInstances",
            usage_operation_update_time: "2023-06-13T06:43:05Z",
            virtualization_type: "hvm",
            vpc_id: "vpc-0166a906d0caee5ef",
            integration_id: "036376663423",
            integration_type: "aws",
            resource_type: "aws_ec2_instance",
            inventory_exc_id: "648820b2f05601c990a7c0e3",
            inventory_schedule_id: "6488176bf09809e62673246f",
            user_id: "amit@shunyeka.com",
            root_user_id: "amit@shunyeka.com",
            updated_at: "2023-06-13T08:14:55.468000",
            created_at: "2023-06-13T08:14:55.468000",
            label: "ec2 instance",
            ogid: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            comboId: "subnet-0531b0ff5654cc6e0_combo"
        }
    },
    {
        data: {
            id: "i-03d0d53d18199274a",
            account_id: "036376663423",
            akas: [
                "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a"
            ],
            ami_launch_index: 0,
            architecture: "x86_64",
            arn: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            block_device_mappings: [
                {
                    DeviceName: "/dev/xvda",
                    Ebs: {
                        AttachTime: "2023-06-13T06:43:06Z",
                        DeleteOnTermination: true,
                        Status: "attached",
                        VolumeId: "vol-02acbc5657acc3cae"
                    }
                }
            ],
            boot_mode: "uefi-preferred",
            capacity_reservation_id: null,
            capacity_reservation_specification: "{CapacityReservationPreference:open CapacityReservationTarget:<nil> noSmithyDocumentSerde:{}}",
            client_token: "6218aa7f-eecd-4c58-8dff-6b8f1af0a694",
            cpu_options_core_count: 1,
            cpu_options_threads_per_core: 1,
            disable_api_termination: false,
            ebs_optimized: false,
            elastic_gpu_associations: null,
            elastic_inference_accelerator_associations: null,
            ena_support: true,
            enclave_options: {
                Enabled: false
            },
            hibernation_options: {
                Configured: false
            },
            hypervisor: "xen",
            iam_instance_profile_arn: null,
            iam_instance_profile_id: null,
            image_id: "ami-049a62eb90480f276",
            instance_id: "i-03d0d53d18199274a",
            instance_initiated_shutdown_behavior: "stop",
            instance_lifecycle: "",
            instance_state: "stopped",
            instance_status: {
                AvailabilityZone: "ap-south-1b",
                Events: null,
                InstanceId: "i-03d0d53d18199274a",
                InstanceState: {
                    Code: 80,
                    Name: "stopped"
                },
                InstanceStatus: {
                    Details: null,
                    Status: "not-applicable"
                },
                OutpostArn: null,
                SystemStatus: {
                    Details: null,
                    Status: "not-applicable"
                }
            },
            instance_type: "t2.micro",
            kernel_id: null,
            key_name: null,
            launch_time: "2023-06-13T06:43:05Z",
            metadata_options: {
                HttpEndpoint: "enabled",
                HttpProtocolIpv6: "disabled",
                HttpPutResponseHopLimit: 2,
                HttpTokens: "required",
                InstanceMetadataTags: "disabled",
                State: "applied"
            },
            monitoring_state: "disabled",
            name: "qatestawscomplianceinstance1",
            network_interfaces: [
                {
                    Association: null,
                    Attachment: {
                        AttachTime: "2023-06-13T06:43:05Z",
                        AttachmentId: "eni-attach-09724a5cfc4ba4edd",
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        NetworkCardIndex: 0,
                        Status: "attached"
                    },
                    Description: "",
                    Groups: [
                        {
                            GroupId: "sg-0a7966ef6c9ac1580",
                            GroupName: "launch-wizard-7"
                        }
                    ],
                    InterfaceType: "interface",
                    Ipv4Prefixes: null,
                    Ipv6Addresses: [],
                    Ipv6Prefixes: null,
                    MacAddress: "0a:bd:70:8b:46:3c",
                    NetworkInterfaceId: "eni-03e9b1775ca0fb63a",
                    OwnerId: "036376663423",
                    PrivateDnsName: "ip-172-31-12-125.ap-south-1.compute.internal",
                    PrivateIpAddress: "172.31.12.125",
                    PrivateIpAddresses: [
                        {
                            Association: null,
                            Primary: true,
                            PrivateDnsName: "ip-172-31-12-125.ap-south-1.compute.internal",
                            PrivateIpAddress: "172.31.12.125"
                        }
                    ],
                    SourceDestCheck: true,
                    Status: "in-use",
                    SubnetId: "subnet-0531b0ff5654cc6e0",
                    VpcId: "vpc-0166a906d0caee5ef"
                }
            ],
            outpost_arn: null,
            partition: "aws",
            placement_availability_zone: "ap-south-1b",
            placement_group_name: "",
            placement_tenancy: "default",
            platform: "",
            platform_details: "Linux/UNIX",
            private_dns_name: "ip-172-31-12-125.ap-south-1.compute.internal",
            private_dns_name_options: {
                EnableResourceNameDnsAAAARecord: false,
                EnableResourceNameDnsARecord: true,
                HostnameType: "ip-name"
            },
            private_ip_address: "172.31.12.125",
            product_codes: [],
            public_dns_name: "",
            public_ip_address: null,
            ram_disk_id: null,
            region: "ap-south-1",
            root_device_name: "/dev/xvda",
            root_device_type: "ebs",
            security_groups: [
                {
                    GroupId: "sg-0a7966ef6c9ac1580",
                    GroupName: "launch-wizard-7"
                }
            ],
            source_dest_check: true,
            sriov_net_support: "simple",
            state_code: 80,
            state_transition_reason: "User initiated (2023-06-13 07:04:00 GMT)",
            state_transition_time: "2023-06-13T07:04:00Z",
            subnet_id: "subnet-0531b0ff5654cc6e0",
            tags_src: [
                {
                    Key: "Name",
                    Value: "qatestawscomplianceinstance1"
                }
            ],
            title: "qatestawscomplianceinstance1",
            tpm_support: null,
            urn: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            usage_operation: "RunInstances",
            usage_operation_update_time: "2023-06-13T06:43:05Z",
            virtualization_type: "hvm",
            vpc_id: "vpc-0166a906d0caee5ef",
            integration_id: "036376663423",
            integration_type: "aws",
            resource_type: "aws_ec2_instance",
            inventory_exc_id: "648820b2f05601c990a7c0e3",
            inventory_schedule_id: "6488176bf09809e62673246f",
            user_id: "amit@shunyeka.com",
            root_user_id: "amit@shunyeka.com",
            updated_at: "2023-06-13T08:14:55.468000",
            created_at: "2023-06-13T08:14:55.468000",
            label: "ec2 instance",
            ogid: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            comboId: "subnet-0531b0ff5654cc6e0_combo"
        }
    },
    {
        data: {
            id: "i-03d0d53d18199274a",
            account_id: "036376663423",
            akas: [
                "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a"
            ],
            ami_launch_index: 0,
            architecture: "x86_64",
            arn: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            block_device_mappings: [
                {
                    DeviceName: "/dev/xvda",
                    Ebs: {
                        AttachTime: "2023-06-13T06:43:06Z",
                        DeleteOnTermination: true,
                        Status: "attached",
                        VolumeId: "vol-02acbc5657acc3cae"
                    }
                }
            ],
            boot_mode: "uefi-preferred",
            capacity_reservation_id: null,
            capacity_reservation_specification: "{CapacityReservationPreference:open CapacityReservationTarget:<nil> noSmithyDocumentSerde:{}}",
            client_token: "6218aa7f-eecd-4c58-8dff-6b8f1af0a694",
            cpu_options_core_count: 1,
            cpu_options_threads_per_core: 1,
            disable_api_termination: false,
            ebs_optimized: false,
            elastic_gpu_associations: null,
            elastic_inference_accelerator_associations: null,
            ena_support: true,
            enclave_options: {
                Enabled: false
            },
            hibernation_options: {
                Configured: false
            },
            hypervisor: "xen",
            iam_instance_profile_arn: null,
            iam_instance_profile_id: null,
            image_id: "ami-049a62eb90480f276",
            instance_id: "i-03d0d53d18199274a",
            instance_initiated_shutdown_behavior: "stop",
            instance_lifecycle: "",
            instance_state: "stopped",
            instance_status: {
                AvailabilityZone: "ap-south-1b",
                Events: null,
                InstanceId: "i-03d0d53d18199274a",
                InstanceState: {
                    Code: 80,
                    Name: "stopped"
                },
                InstanceStatus: {
                    Details: null,
                    Status: "not-applicable"
                },
                OutpostArn: null,
                SystemStatus: {
                    Details: null,
                    Status: "not-applicable"
                }
            },
            instance_type: "t2.micro",
            kernel_id: null,
            key_name: null,
            launch_time: "2023-06-13T06:43:05Z",
            metadata_options: {
                HttpEndpoint: "enabled",
                HttpProtocolIpv6: "disabled",
                HttpPutResponseHopLimit: 2,
                HttpTokens: "required",
                InstanceMetadataTags: "disabled",
                State: "applied"
            },
            monitoring_state: "disabled",
            name: "qatestawscomplianceinstance1",
            network_interfaces: [
                {
                    Association: null,
                    Attachment: {
                        AttachTime: "2023-06-13T06:43:05Z",
                        AttachmentId: "eni-attach-09724a5cfc4ba4edd",
                        DeleteOnTermination: true,
                        DeviceIndex: 0,
                        NetworkCardIndex: 0,
                        Status: "attached"
                    },
                    Description: "",
                    Groups: [
                        {
                            GroupId: "sg-0a7966ef6c9ac1580",
                            GroupName: "launch-wizard-7"
                        }
                    ],
                    InterfaceType: "interface",
                    Ipv4Prefixes: null,
                    Ipv6Addresses: [],
                    Ipv6Prefixes: null,
                    MacAddress: "0a:bd:70:8b:46:3c",
                    NetworkInterfaceId: "eni-03e9b1775ca0fb63a",
                    OwnerId: "036376663423",
                    PrivateDnsName: "ip-172-31-12-125.ap-south-1.compute.internal",
                    PrivateIpAddress: "172.31.12.125",
                    PrivateIpAddresses: [
                        {
                            Association: null,
                            Primary: true,
                            PrivateDnsName: "ip-172-31-12-125.ap-south-1.compute.internal",
                            PrivateIpAddress: "172.31.12.125"
                        }
                    ],
                    SourceDestCheck: true,
                    Status: "in-use",
                    SubnetId: "subnet-0531b0ff5654cc6e0",
                    VpcId: "vpc-0166a906d0caee5ef"
                }
            ],
            outpost_arn: null,
            partition: "aws",
            placement_availability_zone: "ap-south-1b",
            placement_group_name: "",
            placement_tenancy: "default",
            platform: "",
            platform_details: "Linux/UNIX",
            private_dns_name: "ip-172-31-12-125.ap-south-1.compute.internal",
            private_dns_name_options: {
                EnableResourceNameDnsAAAARecord: false,
                EnableResourceNameDnsARecord: true,
                HostnameType: "ip-name"
            },
            private_ip_address: "172.31.12.125",
            product_codes: [],
            public_dns_name: "",
            public_ip_address: null,
            ram_disk_id: null,
            region: "ap-south-1",
            root_device_name: "/dev/xvda",
            root_device_type: "ebs",
            security_groups: [
                {
                    GroupId: "sg-0a7966ef6c9ac1580",
                    GroupName: "launch-wizard-7"
                }
            ],
            source_dest_check: true,
            sriov_net_support: "simple",
            state_code: 80,
            state_transition_reason: "User initiated (2023-06-13 07:04:00 GMT)",
            state_transition_time: "2023-06-13T07:04:00Z",
            subnet_id: "subnet-0531b0ff5654cc6e0",
            tags_src: [
                {
                    Key: "Name",
                    Value: "qatestawscomplianceinstance1"
                }
            ],
            title: "qatestawscomplianceinstance1",
            tpm_support: null,
            urn: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            usage_operation: "RunInstances",
            usage_operation_update_time: "2023-06-13T06:43:05Z",
            virtualization_type: "hvm",
            vpc_id: "vpc-0166a906d0caee5ef",
            integration_id: "036376663423",
            integration_type: "aws",
            resource_type: "aws_ec2_instance",
            inventory_exc_id: "648820b2f05601c990a7c0e3",
            inventory_schedule_id: "6488176bf09809e62673246f",
            user_id: "amit@shunyeka.com",
            root_user_id: "amit@shunyeka.com",
            updated_at: "2023-06-13T08:14:55.468000",
            created_at: "2023-06-13T08:14:55.468000",
            label: "ec2 instance",
            ogid: "arn:aws:ec2:ap-south-1:036376663423:instance/i-03d0d53d18199274a",
            comboId: "subnet-0531b0ff5654cc6e0_combo"
        }
    }
]